export interface PokemonRow {
  "#": number;
  Name: string;
  "Type 1": string;
  "Type 2": string;
  HP: number;
  Attack: number;
  Defense: number;
  "Sp. Atk": number;
  "Sp. Def": number;
  Speed: number;
  Generation: number;
  Legendary: boolean;
}

// 800개 포켓몬 데이터 (대표 샘플 - 전설 포함)
const ALL_POKEMON: PokemonRow[] = [
  { "#": 1, Name: "이상해씨", "Type 1": "풀", "Type 2": "독", HP: 45, Attack: 49, Defense: 49, "Sp. Atk": 65, "Sp. Def": 65, Speed: 45, Generation: 1, Legendary: false },
  { "#": 2, Name: "이상해풀", "Type 1": "풀", "Type 2": "독", HP: 60, Attack: 62, Defense: 63, "Sp. Atk": 80, "Sp. Def": 80, Speed: 60, Generation: 1, Legendary: false },
  { "#": 3, Name: "이상해꽃", "Type 1": "풀", "Type 2": "독", HP: 80, Attack: 82, Defense: 83, "Sp. Atk": 100, "Sp. Def": 100, Speed: 80, Generation: 1, Legendary: false },
  { "#": 4, Name: "파이리", "Type 1": "불꽃", "Type 2": "", HP: 39, Attack: 52, Defense: 43, "Sp. Atk": 60, "Sp. Def": 50, Speed: 65, Generation: 1, Legendary: false },
  { "#": 5, Name: "리자드", "Type 1": "불꽃", "Type 2": "", HP: 58, Attack: 64, Defense: 58, "Sp. Atk": 80, "Sp. Def": 65, Speed: 80, Generation: 1, Legendary: false },
  { "#": 6, Name: "리자몽", "Type 1": "불꽃", "Type 2": "비행", HP: 78, Attack: 84, Defense: 78, "Sp. Atk": 109, "Sp. Def": 85, Speed: 100, Generation: 1, Legendary: false },
  { "#": 7, Name: "꼬부기", "Type 1": "물", "Type 2": "", HP: 44, Attack: 48, Defense: 65, "Sp. Atk": 50, "Sp. Def": 64, Speed: 43, Generation: 1, Legendary: false },
  { "#": 8, Name: "어니부기", "Type 1": "물", "Type 2": "", HP: 59, Attack: 63, Defense: 80, "Sp. Atk": 65, "Sp. Def": 80, Speed: 58, Generation: 1, Legendary: false },
  { "#": 9, Name: "거북왕", "Type 1": "물", "Type 2": "", HP: 79, Attack: 83, Defense: 100, "Sp. Atk": 85, "Sp. Def": 105, Speed: 78, Generation: 1, Legendary: false },
  { "#": 10, Name: "캐터피", "Type 1": "벌레", "Type 2": "", HP: 45, Attack: 30, Defense: 35, "Sp. Atk": 20, "Sp. Def": 20, Speed: 45, Generation: 1, Legendary: false },
  { "#": 11, Name: "단데기", "Type 1": "벌레", "Type 2": "", HP: 50, Attack: 20, Defense: 55, "Sp. Atk": 25, "Sp. Def": 25, Speed: 30, Generation: 1, Legendary: false },
  { "#": 12, Name: "버터플", "Type 1": "벌레", "Type 2": "비행", HP: 60, Attack: 45, Defense: 50, "Sp. Atk": 90, "Sp. Def": 80, Speed: 70, Generation: 1, Legendary: false },
  { "#": 13, Name: "뿔충이", "Type 1": "벌레", "Type 2": "독", HP: 40, Attack: 35, Defense: 30, "Sp. Atk": 20, "Sp. Def": 20, Speed: 50, Generation: 1, Legendary: false },
  { "#": 25, Name: "피카츄", "Type 1": "전기", "Type 2": "", HP: 35, Attack: 55, Defense: 40, "Sp. Atk": 50, "Sp. Def": 50, Speed: 90, Generation: 1, Legendary: false },
  { "#": 26, Name: "라이츄", "Type 1": "전기", "Type 2": "", HP: 60, Attack: 90, Defense: 55, "Sp. Atk": 90, "Sp. Def": 80, Speed: 110, Generation: 1, Legendary: false },
  { "#": 35, Name: "삐삐", "Type 1": "페어리", "Type 2": "", HP: 70, Attack: 45, Defense: 48, "Sp. Atk": 60, "Sp. Def": 65, Speed: 35, Generation: 1, Legendary: false },
  { "#": 36, Name: "픽시", "Type 1": "페어리", "Type 2": "", HP: 95, Attack: 70, Defense: 73, "Sp. Atk": 95, "Sp. Def": 90, Speed: 60, Generation: 1, Legendary: false },
  { "#": 39, Name: "푸린", "Type 1": "노말", "Type 2": "페어리", HP: 115, Attack: 45, Defense: 20, "Sp. Atk": 45, "Sp. Def": 25, Speed: 20, Generation: 1, Legendary: false },
  { "#": 52, Name: "나옹", "Type 1": "노말", "Type 2": "", HP: 40, Attack: 45, Defense: 35, "Sp. Atk": 40, "Sp. Def": 40, Speed: 90, Generation: 1, Legendary: false },
  { "#": 54, Name: "고닥", "Type 1": "물", "Type 2": "", HP: 50, Attack: 52, Defense: 48, "Sp. Atk": 65, "Sp. Def": 50, Speed: 55, Generation: 1, Legendary: false },
  { "#": 58, Name: "가디", "Type 1": "불꽃", "Type 2": "", HP: 55, Attack: 70, Defense: 45, "Sp. Atk": 70, "Sp. Def": 50, Speed: 60, Generation: 1, Legendary: false },
  { "#": 59, Name: "윈디", "Type 1": "불꽃", "Type 2": "", HP: 90, Attack: 110, Defense: 80, "Sp. Atk": 100, "Sp. Def": 80, Speed: 95, Generation: 1, Legendary: false },
  { "#": 63, Name: "캐시", "Type 1": "에스퍼", "Type 2": "", HP: 25, Attack: 20, Defense: 15, "Sp. Atk": 105, "Sp. Def": 55, Speed: 90, Generation: 1, Legendary: false },
  { "#": 66, Name: "알통몬", "Type 1": "격투", "Type 2": "", HP: 70, Attack: 80, Defense: 50, "Sp. Atk": 35, "Sp. Def": 35, Speed: 35, Generation: 1, Legendary: false },
  { "#": 74, Name: "꼬마돌", "Type 1": "바위", "Type 2": "땅", HP: 40, Attack: 80, Defense: 100, "Sp. Atk": 30, "Sp. Def": 30, Speed: 20, Generation: 1, Legendary: false },
  { "#": 79, Name: "야돈", "Type 1": "물", "Type 2": "에스퍼", HP: 90, Attack: 65, Defense: 65, "Sp. Atk": 40, "Sp. Def": 40, Speed: 15, Generation: 1, Legendary: false },
  { "#": 94, Name: "팬텀", "Type 1": "고스트", "Type 2": "독", HP: 60, Attack: 65, Defense: 60, "Sp. Atk": 130, "Sp. Def": 75, Speed: 110, Generation: 1, Legendary: false },
  { "#": 113, Name: "럭키", "Type 1": "노말", "Type 2": "", HP: 250, Attack: 5, Defense: 5, "Sp. Atk": 35, "Sp. Def": 105, Speed: 50, Generation: 1, Legendary: false },
  { "#": 130, Name: "갸라도스", "Type 1": "물", "Type 2": "비행", HP: 95, Attack: 125, Defense: 79, "Sp. Atk": 60, "Sp. Def": 100, Speed: 81, Generation: 1, Legendary: false },
  { "#": 131, Name: "라프라스", "Type 1": "물", "Type 2": "얼음", HP: 130, Attack: 85, Defense: 80, "Sp. Atk": 85, "Sp. Def": 95, Speed: 60, Generation: 1, Legendary: false },
  { "#": 133, Name: "이브이", "Type 1": "노말", "Type 2": "", HP: 55, Attack: 55, Defense: 50, "Sp. Atk": 45, "Sp. Def": 65, Speed: 55, Generation: 1, Legendary: false },
  { "#": 143, Name: "잠만보", "Type 1": "노말", "Type 2": "", HP: 160, Attack: 110, Defense: 65, "Sp. Atk": 65, "Sp. Def": 110, Speed: 30, Generation: 1, Legendary: false },
  { "#": 144, Name: "프리져", "Type 1": "얼음", "Type 2": "비행", HP: 90, Attack: 85, Defense: 100, "Sp. Atk": 95, "Sp. Def": 125, Speed: 85, Generation: 1, Legendary: true },
  { "#": 145, Name: "썬더", "Type 1": "전기", "Type 2": "비행", HP: 90, Attack: 90, Defense: 85, "Sp. Atk": 125, "Sp. Def": 90, Speed: 100, Generation: 1, Legendary: true },
  { "#": 146, Name: "파이어", "Type 1": "불꽃", "Type 2": "비행", HP: 90, Attack: 100, Defense: 90, "Sp. Atk": 125, "Sp. Def": 85, Speed: 90, Generation: 1, Legendary: true },
  { "#": 147, Name: "미뇽", "Type 1": "드래곤", "Type 2": "", HP: 41, Attack: 64, Defense: 45, "Sp. Atk": 50, "Sp. Def": 50, Speed: 50, Generation: 1, Legendary: false },
  { "#": 149, Name: "망나뇽", "Type 1": "드래곤", "Type 2": "비행", HP: 91, Attack: 134, Defense: 95, "Sp. Atk": 100, "Sp. Def": 100, Speed: 80, Generation: 1, Legendary: false },
  { "#": 150, Name: "뮤츠", "Type 1": "에스퍼", "Type 2": "", HP: 106, Attack: 110, Defense: 90, "Sp. Atk": 154, "Sp. Def": 90, Speed: 130, Generation: 1, Legendary: true },
  { "#": 151, Name: "뮤", "Type 1": "에스퍼", "Type 2": "", HP: 100, Attack: 100, Defense: 100, "Sp. Atk": 100, "Sp. Def": 100, Speed: 100, Generation: 1, Legendary: false },
  { "#": 152, Name: "치코리타", "Type 1": "풀", "Type 2": "", HP: 45, Attack: 49, Defense: 65, "Sp. Atk": 49, "Sp. Def": 65, Speed: 45, Generation: 2, Legendary: false },
  { "#": 155, Name: "브케인", "Type 1": "불꽃", "Type 2": "", HP: 39, Attack: 52, Defense: 43, "Sp. Atk": 60, "Sp. Def": 50, Speed: 65, Generation: 2, Legendary: false },
  { "#": 158, Name: "리아코", "Type 1": "물", "Type 2": "", HP: 50, Attack: 65, Defense: 64, "Sp. Atk": 44, "Sp. Def": 48, Speed: 43, Generation: 2, Legendary: false },
  { "#": 175, Name: "토게피", "Type 1": "페어리", "Type 2": "", HP: 35, Attack: 20, Defense: 65, "Sp. Atk": 40, "Sp. Def": 65, Speed: 20, Generation: 2, Legendary: false },
  { "#": 179, Name: "메리프", "Type 1": "전기", "Type 2": "", HP: 55, Attack: 40, Defense: 40, "Sp. Atk": 65, "Sp. Def": 45, Speed: 35, Generation: 2, Legendary: false },
  { "#": 196, Name: "에브이", "Type 1": "에스퍼", "Type 2": "", HP: 65, Attack: 65, Defense: 60, "Sp. Atk": 130, "Sp. Def": 95, Speed: 110, Generation: 2, Legendary: false },
  { "#": 197, Name: "블래키", "Type 1": "악", "Type 2": "", HP: 95, Attack: 65, Defense: 110, "Sp. Atk": 60, "Sp. Def": 130, Speed: 65, Generation: 2, Legendary: false },
  { "#": 212, Name: "핫삼", "Type 1": "벌레", "Type 2": "강철", HP: 70, Attack: 130, Defense: 100, "Sp. Atk": 55, "Sp. Def": 80, Speed: 65, Generation: 2, Legendary: false },
  { "#": 230, Name: "킹드라", "Type 1": "물", "Type 2": "드래곤", HP: 75, Attack: 95, Defense: 95, "Sp. Atk": 95, "Sp. Def": 95, Speed: 85, Generation: 2, Legendary: false },
  { "#": 243, Name: "라이코", "Type 1": "전기", "Type 2": "", HP: 90, Attack: 85, Defense: 75, "Sp. Atk": 115, "Sp. Def": 100, Speed: 115, Generation: 2, Legendary: true },
  { "#": 244, Name: "앤테이", "Type 1": "불꽃", "Type 2": "", HP: 115, Attack: 115, Defense: 85, "Sp. Atk": 90, "Sp. Def": 75, Speed: 100, Generation: 2, Legendary: true },
  { "#": 245, Name: "스이쿤", "Type 1": "물", "Type 2": "", HP: 100, Attack: 75, Defense: 115, "Sp. Atk": 90, "Sp. Def": 115, Speed: 85, Generation: 2, Legendary: true },
  { "#": 249, Name: "루기아", "Type 1": "에스퍼", "Type 2": "비행", HP: 106, Attack: 90, Defense: 130, "Sp. Atk": 90, "Sp. Def": 154, Speed: 110, Generation: 2, Legendary: true },
  { "#": 250, Name: "칠색조", "Type 1": "불꽃", "Type 2": "비행", HP: 106, Attack: 130, Defense: 90, "Sp. Atk": 110, "Sp. Def": 154, Speed: 90, Generation: 2, Legendary: true },
  { "#": 252, Name: "나무지기", "Type 1": "풀", "Type 2": "", HP: 40, Attack: 45, Defense: 35, "Sp. Atk": 65, "Sp. Def": 55, Speed: 70, Generation: 3, Legendary: false },
  { "#": 255, Name: "아차모", "Type 1": "불꽃", "Type 2": "", HP: 45, Attack: 60, Defense: 40, "Sp. Atk": 70, "Sp. Def": 50, Speed: 45, Generation: 3, Legendary: false },
  { "#": 258, Name: "물짱이", "Type 1": "물", "Type 2": "", HP: 50, Attack: 70, Defense: 50, "Sp. Atk": 50, "Sp. Def": 50, Speed: 40, Generation: 3, Legendary: false },
  { "#": 282, Name: "가디안", "Type 1": "에스퍼", "Type 2": "페어리", HP: 68, Attack: 65, Defense: 65, "Sp. Atk": 125, "Sp. Def": 115, Speed: 80, Generation: 3, Legendary: false },
  { "#": 302, Name: "깜까미", "Type 1": "악", "Type 2": "고스트", HP: 50, Attack: 75, Defense: 75, "Sp. Atk": 65, "Sp. Def": 65, Speed: 50, Generation: 3, Legendary: false },
  { "#": 330, Name: "플라이곤", "Type 1": "땅", "Type 2": "드래곤", HP: 80, Attack: 100, Defense: 80, "Sp. Atk": 80, "Sp. Def": 80, Speed: 100, Generation: 3, Legendary: false },
  { "#": 334, Name: "파비코리", "Type 1": "드래곤", "Type 2": "비행", HP: 75, Attack: 70, Defense: 90, "Sp. Atk": 70, "Sp. Def": 105, Speed: 80, Generation: 3, Legendary: false },
  { "#": 350, Name: "밀로틱", "Type 1": "물", "Type 2": "", HP: 95, Attack: 60, Defense: 79, "Sp. Atk": 100, "Sp. Def": 125, Speed: 81, Generation: 3, Legendary: false },
  { "#": 359, Name: "앱솔", "Type 1": "악", "Type 2": "", HP: 65, Attack: 130, Defense: 60, "Sp. Atk": 75, "Sp. Def": 60, Speed: 75, Generation: 3, Legendary: false },
  { "#": 371, Name: "아공이", "Type 1": "드래곤", "Type 2": "", HP: 45, Attack: 75, Defense: 60, "Sp. Atk": 40, "Sp. Def": 30, Speed: 50, Generation: 3, Legendary: false },
  { "#": 373, Name: "보만다", "Type 1": "드래곤", "Type 2": "비행", HP: 95, Attack: 135, Defense: 80, "Sp. Atk": 110, "Sp. Def": 80, Speed: 100, Generation: 3, Legendary: false },
  { "#": 376, Name: "메타그로스", "Type 1": "강철", "Type 2": "에스퍼", HP: 80, Attack: 135, Defense: 130, "Sp. Atk": 95, "Sp. Def": 90, Speed: 70, Generation: 3, Legendary: false },
  { "#": 377, Name: "레지락", "Type 1": "바위", "Type 2": "", HP: 80, Attack: 100, Defense: 200, "Sp. Atk": 50, "Sp. Def": 100, Speed: 50, Generation: 3, Legendary: true },
  { "#": 378, Name: "레지아이스", "Type 1": "얼음", "Type 2": "", HP: 80, Attack: 50, Defense: 100, "Sp. Atk": 100, "Sp. Def": 200, Speed: 50, Generation: 3, Legendary: true },
  { "#": 379, Name: "레지스틸", "Type 1": "강철", "Type 2": "", HP: 80, Attack: 75, Defense: 150, "Sp. Atk": 75, "Sp. Def": 150, Speed: 50, Generation: 3, Legendary: true },
  { "#": 380, Name: "라티아스", "Type 1": "드래곤", "Type 2": "에스퍼", HP: 80, Attack: 80, Defense: 90, "Sp. Atk": 110, "Sp. Def": 130, Speed: 110, Generation: 3, Legendary: true },
  { "#": 381, Name: "라티오스", "Type 1": "드래곤", "Type 2": "에스퍼", HP: 80, Attack: 90, Defense: 80, "Sp. Atk": 130, "Sp. Def": 110, Speed: 110, Generation: 3, Legendary: true },
  { "#": 382, Name: "가이오가", "Type 1": "물", "Type 2": "", HP: 100, Attack: 100, Defense: 90, "Sp. Atk": 150, "Sp. Def": 140, Speed: 90, Generation: 3, Legendary: true },
  { "#": 383, Name: "그란돈", "Type 1": "땅", "Type 2": "", HP: 100, Attack: 150, Defense: 140, "Sp. Atk": 100, "Sp. Def": 90, Speed: 90, Generation: 3, Legendary: true },
  { "#": 384, Name: "레쿠쟈", "Type 1": "드래곤", "Type 2": "비행", HP: 105, Attack: 150, Defense: 90, "Sp. Atk": 150, "Sp. Def": 90, Speed: 95, Generation: 3, Legendary: true },
  { "#": 385, Name: "지라치", "Type 1": "강철", "Type 2": "에스퍼", HP: 100, Attack: 100, Defense: 100, "Sp. Atk": 100, "Sp. Def": 100, Speed: 100, Generation: 3, Legendary: false },
  { "#": 386, Name: "테오키스", "Type 1": "에스퍼", "Type 2": "", HP: 50, Attack: 150, Defense: 50, "Sp. Atk": 150, "Sp. Def": 50, Speed: 150, Generation: 3, Legendary: false },
  { "#": 387, Name: "모부기", "Type 1": "풀", "Type 2": "", HP: 55, Attack: 68, Defense: 64, "Sp. Atk": 45, "Sp. Def": 55, Speed: 31, Generation: 4, Legendary: false },
  { "#": 390, Name: "불꽃숭이", "Type 1": "불꽃", "Type 2": "", HP: 44, Attack: 58, Defense: 44, "Sp. Atk": 58, "Sp. Def": 44, Speed: 61, Generation: 4, Legendary: false },
  { "#": 393, Name: "팽도리", "Type 1": "물", "Type 2": "", HP: 53, Attack: 51, Defense: 53, "Sp. Atk": 61, "Sp. Def": 56, Speed: 40, Generation: 4, Legendary: false },
  { "#": 405, Name: "렌트라", "Type 1": "전기", "Type 2": "", HP: 80, Attack: 120, Defense: 79, "Sp. Atk": 95, "Sp. Def": 79, Speed: 70, Generation: 4, Legendary: false },
  { "#": 418, Name: "브이젤", "Type 1": "물", "Type 2": "", HP: 55, Attack: 65, Defense: 35, "Sp. Atk": 60, "Sp. Def": 30, Speed: 85, Generation: 4, Legendary: false },
  { "#": 430, Name: "돈크로우", "Type 1": "악", "Type 2": "비행", HP: 100, Attack: 125, Defense: 52, "Sp. Atk": 105, "Sp. Def": 52, Speed: 71, Generation: 4, Legendary: false },
  { "#": 444, Name: "한바이트", "Type 1": "드래곤", "Type 2": "땅", HP: 68, Attack: 90, Defense: 65, "Sp. Atk": 50, "Sp. Def": 55, Speed: 82, Generation: 4, Legendary: false },
  { "#": 445, Name: "한카리아스", "Type 1": "드래곤", "Type 2": "땅", HP: 108, Attack: 130, Defense: 95, "Sp. Atk": 80, "Sp. Def": 85, Speed: 102, Generation: 4, Legendary: false },
  { "#": 448, Name: "루카리오", "Type 1": "격투", "Type 2": "강철", HP: 70, Attack: 110, Defense: 70, "Sp. Atk": 115, "Sp. Def": 70, Speed: 90, Generation: 4, Legendary: false },
  { "#": 461, Name: "포푸니라", "Type 1": "악", "Type 2": "얼음", HP: 70, Attack: 120, Defense: 65, "Sp. Atk": 45, "Sp. Def": 85, Speed: 125, Generation: 4, Legendary: false },
  { "#": 470, Name: "리피아", "Type 1": "풀", "Type 2": "", HP: 65, Attack: 110, Defense: 130, "Sp. Atk": 60, "Sp. Def": 65, Speed: 95, Generation: 4, Legendary: false },
  { "#": 471, Name: "글레이시아", "Type 1": "얼음", "Type 2": "", HP: 65, Attack: 60, Defense: 110, "Sp. Atk": 130, "Sp. Def": 95, Speed: 65, Generation: 4, Legendary: false },
  { "#": 474, Name: "폴리곤Z", "Type 1": "노말", "Type 2": "", HP: 85, Attack: 80, Defense: 70, "Sp. Atk": 135, "Sp. Def": 75, Speed: 90, Generation: 4, Legendary: false },
  { "#": 480, Name: "유크시", "Type 1": "에스퍼", "Type 2": "", HP: 75, Attack: 75, Defense: 130, "Sp. Atk": 75, "Sp. Def": 130, Speed: 95, Generation: 4, Legendary: true },
  { "#": 481, Name: "엠라이트", "Type 1": "에스퍼", "Type 2": "", HP: 80, Attack: 105, Defense: 105, "Sp. Atk": 105, "Sp. Def": 105, Speed: 80, Generation: 4, Legendary: true },
  { "#": 482, Name: "아그놈", "Type 1": "에스퍼", "Type 2": "", HP: 75, Attack: 125, Defense: 70, "Sp. Atk": 125, "Sp. Def": 70, Speed: 115, Generation: 4, Legendary: true },
  { "#": 483, Name: "디아루가", "Type 1": "강철", "Type 2": "드래곤", HP: 100, Attack: 120, Defense: 120, "Sp. Atk": 150, "Sp. Def": 100, Speed: 90, Generation: 4, Legendary: true },
  { "#": 484, Name: "펄기아", "Type 1": "물", "Type 2": "드래곤", HP: 90, Attack: 120, Defense: 100, "Sp. Atk": 150, "Sp. Def": 120, Speed: 100, Generation: 4, Legendary: true },
  { "#": 487, Name: "기라티나", "Type 1": "고스트", "Type 2": "드래곤", HP: 150, Attack: 100, Defense: 120, "Sp. Atk": 100, "Sp. Def": 120, Speed: 90, Generation: 4, Legendary: true },
  { "#": 488, Name: "크레세리아", "Type 1": "에스퍼", "Type 2": "", HP: 120, Attack: 70, Defense: 120, "Sp. Atk": 75, "Sp. Def": 130, Speed: 85, Generation: 4, Legendary: true },
  { "#": 493, Name: "아르세우스", "Type 1": "노말", "Type 2": "", HP: 120, Attack: 120, Defense: 120, "Sp. Atk": 120, "Sp. Def": 120, Speed: 120, Generation: 4, Legendary: true },
  { "#": 495, Name: "주리비얀", "Type 1": "풀", "Type 2": "", HP: 45, Attack: 45, Defense: 55, "Sp. Atk": 45, "Sp. Def": 55, Speed: 63, Generation: 5, Legendary: false },
  { "#": 498, Name: "뚜꾸리", "Type 1": "불꽃", "Type 2": "", HP: 65, Attack: 63, Defense: 45, "Sp. Atk": 45, "Sp. Def": 45, Speed: 45, Generation: 5, Legendary: false },
  { "#": 501, Name: "수댕이", "Type 1": "물", "Type 2": "", HP: 55, Attack: 55, Defense: 45, "Sp. Atk": 63, "Sp. Def": 45, Speed: 45, Generation: 5, Legendary: false },
  { "#": 530, Name: "몰드류", "Type 1": "땅", "Type 2": "강철", HP: 110, Attack: 135, Defense: 60, "Sp. Atk": 50, "Sp. Def": 65, Speed: 88, Generation: 5, Legendary: false },
  { "#": 545, Name: "펜드라", "Type 1": "벌레", "Type 2": "독", HP: 60, Attack: 100, Defense: 89, "Sp. Atk": 55, "Sp. Def": 69, Speed: 112, Generation: 5, Legendary: false },
  { "#": 560, Name: "곤율거니", "Type 1": "악", "Type 2": "격투", HP: 65, Attack: 90, Defense: 115, "Sp. Atk": 45, "Sp. Def": 115, Speed: 58, Generation: 5, Legendary: false },
  { "#": 587, Name: "에몽가", "Type 1": "전기", "Type 2": "비행", HP: 55, Attack: 75, Defense: 60, "Sp. Atk": 75, "Sp. Def": 60, Speed: 103, Generation: 5, Legendary: false },
  { "#": 612, Name: "액스라이즈", "Type 1": "드래곤", "Type 2": "", HP: 76, Attack: 147, Defense: 90, "Sp. Atk": 60, "Sp. Def": 70, Speed: 97, Generation: 5, Legendary: false },
  { "#": 635, Name: "삼삼드래", "Type 1": "악", "Type 2": "드래곤", HP: 92, Attack: 105, Defense: 90, "Sp. Atk": 125, "Sp. Def": 90, Speed: 98, Generation: 5, Legendary: false },
  { "#": 638, Name: "코바르온", "Type 1": "강철", "Type 2": "격투", HP: 91, Attack: 90, Defense: 129, "Sp. Atk": 90, "Sp. Def": 72, Speed: 108, Generation: 5, Legendary: true },
  { "#": 639, Name: "테라키온", "Type 1": "바위", "Type 2": "격투", HP: 91, Attack: 129, Defense: 90, "Sp. Atk": 72, "Sp. Def": 90, Speed: 108, Generation: 5, Legendary: true },
  { "#": 640, Name: "비리디온", "Type 1": "풀", "Type 2": "격투", HP: 91, Attack: 90, Defense: 72, "Sp. Atk": 90, "Sp. Def": 129, Speed: 108, Generation: 5, Legendary: true },
  { "#": 641, Name: "토네로스", "Type 1": "비행", "Type 2": "", HP: 79, Attack: 115, Defense: 70, "Sp. Atk": 125, "Sp. Def": 80, Speed: 111, Generation: 5, Legendary: true },
  { "#": 642, Name: "볼트로스", "Type 1": "전기", "Type 2": "비행", HP: 79, Attack: 115, Defense: 70, "Sp. Atk": 125, "Sp. Def": 80, Speed: 111, Generation: 5, Legendary: true },
  { "#": 643, Name: "레시라무", "Type 1": "드래곤", "Type 2": "불꽃", HP: 100, Attack: 120, Defense: 100, "Sp. Atk": 150, "Sp. Def": 120, Speed: 90, Generation: 5, Legendary: true },
  { "#": 644, Name: "제크로무", "Type 1": "드래곤", "Type 2": "전기", HP: 100, Attack: 150, Defense: 120, "Sp. Atk": 120, "Sp. Def": 100, Speed: 90, Generation: 5, Legendary: true },
  { "#": 645, Name: "랜드로스", "Type 1": "땅", "Type 2": "비행", HP: 89, Attack: 125, Defense: 90, "Sp. Atk": 115, "Sp. Def": 80, Speed: 101, Generation: 5, Legendary: true },
  { "#": 646, Name: "큐레무", "Type 1": "드래곤", "Type 2": "얼음", HP: 125, Attack: 130, Defense: 90, "Sp. Atk": 130, "Sp. Def": 90, Speed: 95, Generation: 5, Legendary: true },
  { "#": 650, Name: "도치마론", "Type 1": "풀", "Type 2": "", HP: 56, Attack: 61, Defense: 65, "Sp. Atk": 48, "Sp. Def": 45, Speed: 38, Generation: 6, Legendary: false },
  { "#": 653, Name: "푸코", "Type 1": "불꽃", "Type 2": "", HP: 40, Attack: 45, Defense: 40, "Sp. Atk": 62, "Sp. Def": 60, Speed: 60, Generation: 6, Legendary: false },
  { "#": 656, Name: "개구마르", "Type 1": "물", "Type 2": "", HP: 41, Attack: 56, Defense: 40, "Sp. Atk": 62, "Sp. Def": 44, Speed: 71, Generation: 6, Legendary: false },
  { "#": 658, Name: "개굴닌자", "Type 1": "물", "Type 2": "악", HP: 72, Attack: 95, Defense: 67, "Sp. Atk": 103, "Sp. Def": 71, Speed: 122, Generation: 6, Legendary: false },
  { "#": 669, Name: "플라베베", "Type 1": "페어리", "Type 2": "", HP: 44, Attack: 38, Defense: 39, "Sp. Atk": 61, "Sp. Def": 79, Speed: 42, Generation: 6, Legendary: false },
  { "#": 700, Name: "님피아", "Type 1": "페어리", "Type 2": "", HP: 95, Attack: 65, Defense: 65, "Sp. Atk": 110, "Sp. Def": 130, Speed: 60, Generation: 6, Legendary: false },
  { "#": 701, Name: "루차불", "Type 1": "격투", "Type 2": "비행", HP: 78, Attack: 92, Defense: 75, "Sp. Atk": 74, "Sp. Def": 63, Speed: 118, Generation: 6, Legendary: false },
  { "#": 716, Name: "제르네아스", "Type 1": "페어리", "Type 2": "", HP: 126, Attack: 131, Defense: 95, "Sp. Atk": 131, "Sp. Def": 98, Speed: 99, Generation: 6, Legendary: true },
  { "#": 717, Name: "이벨타르", "Type 1": "악", "Type 2": "비행", HP: 126, Attack: 131, Defense: 95, "Sp. Atk": 131, "Sp. Def": 98, Speed: 99, Generation: 6, Legendary: true },
  { "#": 718, Name: "지가르데", "Type 1": "드래곤", "Type 2": "땅", HP: 108, Attack: 100, Defense: 121, "Sp. Atk": 81, "Sp. Def": 95, Speed: 95, Generation: 6, Legendary: true },
  { "#": 719, Name: "디안시", "Type 1": "바위", "Type 2": "페어리", HP: 50, Attack: 100, Defense: 150, "Sp. Atk": 100, "Sp. Def": 150, Speed: 50, Generation: 6, Legendary: false },
  { "#": 720, Name: "후파", "Type 1": "에스퍼", "Type 2": "고스트", HP: 80, Attack: 110, Defense: 60, "Sp. Atk": 150, "Sp. Def": 130, Speed: 70, Generation: 6, Legendary: false },
  { "#": 721, Name: "볼케니온", "Type 1": "불꽃", "Type 2": "물", HP: 80, Attack: 110, Defense: 120, "Sp. Atk": 130, "Sp. Def": 90, Speed: 70, Generation: 6, Legendary: false },
];

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 50개 랜덤 샘플 (전설 3개 이상 보장)
export function getSamplePokemon(): PokemonRow[] {
  const legendaries = ALL_POKEMON.filter((p) => p.Legendary);
  const nonLegendaries = ALL_POKEMON.filter((p) => !p.Legendary);

  const shuffledLegendaries = shuffleArray(legendaries);
  const shuffledNonLeg = shuffleArray(nonLegendaries);

  // 전설 최소 3개 보장
  const selectedLeg = shuffledLegendaries.slice(0, Math.max(3, Math.min(5, legendaries.length)));
  const remaining = 50 - selectedLeg.length;
  const selectedNonLeg = shuffledNonLeg.slice(0, remaining);

  return shuffleArray([...selectedLeg, ...selectedNonLeg]);
}

export { ALL_POKEMON };
