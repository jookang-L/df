-- PokéPandas: students & mission_attempts

-- ─── updated_at trigger ─────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ─── students ───────────────────────────────────────────────
create table public.students (
  id uuid primary key default gen_random_uuid(),
  student_number text not null unique,
  name text not null,
  password_hash text not null,
  total_score integer not null default 0 check (total_score >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger students_updated_at
  before update on public.students
  for each row execute function public.set_updated_at();

-- ─── mission_attempts ───────────────────────────────────────
create table public.mission_attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  mission_id text not null,
  difficulty text not null check (difficulty in ('쉬움', '보통', '어려움')),
  is_correct boolean not null default false,
  wrong_attempts integer not null default 0 check (wrong_attempts >= 0),
  earned_score integer not null default 0 check (earned_score >= 0),
  submitted_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, mission_id)
);

create trigger mission_attempts_updated_at
  before update on public.mission_attempts
  for each row execute function public.set_updated_at();

create index mission_attempts_student_id_idx on public.mission_attempts (student_id);
create index students_total_score_idx on public.students (total_score desc);

-- ─── total_score recalculation ──────────────────────────────
create or replace function public.recalculate_student_total_score(p_student_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_total integer;
begin
  select coalesce(sum(earned_score), 0)
  into v_total
  from public.mission_attempts
  where student_id = p_student_id
    and is_correct = true;

  update public.students
  set total_score = v_total
  where id = p_student_id;
end;
$$;

create or replace function public.on_mission_attempt_score_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.recalculate_student_total_score(
    coalesce(new.student_id, old.student_id)
  );
  return coalesce(new, old);
end;
$$;

create trigger mission_attempts_recalc_score
  after insert or update or delete on public.mission_attempts
  for each row execute function public.on_mission_attempt_score_change();

-- ─── leaderboard view ───────────────────────────────────────
create or replace view public.leaderboard_view
with (security_invoker = true)
as
select
  id,
  student_number,
  name,
  total_score,
  created_at
from public.students
order by total_score desc, created_at asc;

-- ─── RLS ────────────────────────────────────────────────────
alter table public.students enable row level security;
alter table public.mission_attempts enable row level security;

-- anon/authenticated: no direct policies (deny all)
-- service_role bypasses RLS for server-side access

revoke all on public.leaderboard_view from anon, authenticated;
grant select on public.leaderboard_view to service_role;
