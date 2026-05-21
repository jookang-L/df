/** 문자열 literal을 placeholder로 치환 */
function protectLiterals(code: string): { protected: string; literals: string[] } {
  const literals: string[] = [];
  let result = "";
  let i = 0;
  while (i < code.length) {
    const ch = code[i];
    if (ch === "'" || ch === '"') {
      let j = i + 1;
      while (j < code.length && code[j] !== ch) j++;
      if (j < code.length) j++;
      literals.push(code.slice(i, j));
      result += `\x00L${literals.length - 1}\x00`;
      i = j;
    } else {
      result += ch;
      i++;
    }
  }
  return { protected: result, literals };
}

function restoreLiterals(protectedCode: string, literals: string[]): string {
  return protectedCode.replace(/\x00L(\d+)\x00/g, (_, idx) => literals[parseInt(idx, 10)]);
}

/** 학생 코드 정규화 — literal 내부는 보존 */
export function normalizeCode(code: string): string {
  let s = code.trim();
  const { protected: protectedCode, literals } = protectLiterals(s);
  s = protectedCode;

  s = s.replace(/\s+/g, " ");
  s = s.replace(/\(\s+/g, "(").replace(/\s+\)/g, ")");
  s = s.replace(/\[\s+/g, "[").replace(/\s+\]/g, "]");
  s = s.replace(/\s*,\s*/g, ", ");
  s = s.replace(/\)\s*&\s*\(/g, ") & (");
  s = s.replace(/\s*(==|!=|>=|<=|>|<)\s*/g, " $1 ");
  s = s.replace(/\s*\.\s*loc\s*\[/g, ".loc[");
  s = s.replace(/\s*\.\s*iloc\s*\[/g, ".iloc[");

  return restoreLiterals(s, literals).trim();
}
