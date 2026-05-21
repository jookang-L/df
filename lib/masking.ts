export function maskStudentNumber(studentNumber: string): string {
  if (studentNumber.length <= 4) {
    return "*".repeat(studentNumber.length);
  }
  return studentNumber.slice(0, 4) + "****";
}

export function maskName(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length <= 1) return "*";
  if (trimmed.length === 2) return `${trimmed[0]}*`;
  return `${trimmed[0]}${"*".repeat(Math.max(1, trimmed.length - 2))}${trimmed[trimmed.length - 1]}`;
}
