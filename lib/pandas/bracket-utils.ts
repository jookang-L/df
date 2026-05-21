export function parseValue(val: string): string | number | boolean {
  const trimmed = val.trim();
  if (trimmed === "True" || trimmed === "true") return true;
  if (trimmed === "False" || trimmed === "false") return false;
  const unquoted = trimmed.replace(/^['"]|['"]$/g, "");
  const num = Number(unquoted);
  if (!isNaN(num) && unquoted !== "") return num;
  return unquoted;
}

export function parseColumnList(expr: string): string[] {
  const matches = expr.match(/['"]([^'"]+)['"]/g);
  if (!matches) return [];
  return matches.map((m) => m.replace(/^['"]|['"]$/g, ""));
}

export function parseIntList(expr: string): number[] {
  const inner = expr.trim().replace(/^\[|\]$/g, "");
  if (!inner.trim()) return [];
  return inner.split(",").map((s) => {
    const n = parseInt(s.trim(), 10);
    if (Number.isNaN(n)) throw new Error(`SyntaxError: 정수 리스트를 해석할 수 없습니다: ${expr}`);
    return n;
  });
}

export function findTopLevelComma(str: string): number {
  let depth = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "[" || str[i] === "(") depth++;
    else if (str[i] === "]" || str[i] === ")") depth--;
    else if (str[i] === "," && depth === 0) return i;
  }
  return -1;
}

export function extractFirstDfBracket(s: string): { inner: string; rest: string } | null {
  if (!s.startsWith("df[")) return null;
  let depth = 0;
  for (let i = 2; i < s.length; i++) {
    if (s[i] === "[") depth++;
    else if (s[i] === "]") {
      depth--;
      if (depth === 0) {
        return { inner: s.slice(3, i), rest: s.slice(i + 1) };
      }
    }
  }
  return null;
}

export function extractIlocBracket(s: string): { inner: string; rest: string } | null {
  if (!s.startsWith("df.iloc[")) return null;
  let depth = 0;
  for (let i = 7; i < s.length; i++) {
    if (s[i] === "[") depth++;
    else if (s[i] === "]") {
      depth--;
      if (depth === 0) {
        return { inner: s.slice(8, i), rest: s.slice(i + 1) };
      }
    }
  }
  return null;
}

export function extractLocBracket(s: string): { inner: string; rest: string } | null {
  if (!s.startsWith("df.loc[")) return null;
  let depth = 0;
  for (let i = 6; i < s.length; i++) {
    if (s[i] === "[") depth++;
    else if (s[i] === "]") {
      depth--;
      if (depth === 0) {
        return { inner: s.slice(7, i), rest: s.slice(i + 1) };
      }
    }
  }
  return null;
}

export function extractBracketContent(s: string, prefix: string): string | null {
  if (!s.startsWith(prefix)) return null;
  const start = prefix.length;
  if (s[start - 1] !== "[" || s[s.length - 1] !== "]") return null;
  let depth = 0;
  for (let i = start - 1; i < s.length; i++) {
    if (s[i] === "[") depth++;
    else if (s[i] === "]") {
      depth--;
      if (depth === 0) return s.slice(start, i);
    }
  }
  return null;
}

export function getColumns(data: Record<string, unknown>[]): string[] {
  if (!data.length) return [];
  return Object.keys(data[0]);
}
