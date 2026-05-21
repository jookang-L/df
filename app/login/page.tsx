import LoginForm from "@/components/auth/LoginForm";

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const redirectTo = params.redirect ?? "/mission";

  return (
    <div className="flex-1 bg-gray-50 flex items-center justify-center py-12 px-4">
      <LoginForm redirectTo={redirectTo} />
    </div>
  );
}
