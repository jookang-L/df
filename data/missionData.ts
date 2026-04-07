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
  { "#": 1, Name: "Bulbasaur", "Type 1": "Grass", "Type 2": "Poison", HP: 45, Attack: 49, Defense: 49, "Sp. Atk": 65, "Sp. Def": 65, Speed: 45, Generation: 1, Legendary: false },
  { "#": 2, Name: "Ivysaur", "Type 1": "Grass", "Type 2": "Poison", HP: 60, Attack: 62, Defense: 63, "Sp. Atk": 80, "Sp. Def": 80, Speed: 60, Generation: 1, Legendary: false },
  { "#": 3, Name: "Venusaur", "Type 1": "Grass", "Type 2": "Poison", HP: 80, Attack: 82, Defense: 83, "Sp. Atk": 100, "Sp. Def": 100, Speed: 80, Generation: 1, Legendary: false },
  { "#": 4, Name: "Charmander", "Type 1": "Fire", "Type 2": "", HP: 39, Attack: 52, Defense: 43, "Sp. Atk": 60, "Sp. Def": 50, Speed: 65, Generation: 1, Legendary: false },
  { "#": 5, Name: "Charmeleon", "Type 1": "Fire", "Type 2": "", HP: 58, Attack: 64, Defense: 58, "Sp. Atk": 80, "Sp. Def": 65, Speed: 80, Generation: 1, Legendary: false },
  { "#": 6, Name: "Charizard", "Type 1": "Fire", "Type 2": "Flying", HP: 78, Attack: 84, Defense: 78, "Sp. Atk": 109, "Sp. Def": 85, Speed: 100, Generation: 1, Legendary: false },
  { "#": 7, Name: "Squirtle", "Type 1": "Water", "Type 2": "", HP: 44, Attack: 48, Defense: 65, "Sp. Atk": 50, "Sp. Def": 64, Speed: 43, Generation: 1, Legendary: false },
  { "#": 8, Name: "Wartortle", "Type 1": "Water", "Type 2": "", HP: 59, Attack: 63, Defense: 80, "Sp. Atk": 65, "Sp. Def": 80, Speed: 58, Generation: 1, Legendary: false },
  { "#": 9, Name: "Blastoise", "Type 1": "Water", "Type 2": "", HP: 79, Attack: 83, Defense: 100, "Sp. Atk": 85, "Sp. Def": 105, Speed: 78, Generation: 1, Legendary: false },
  { "#": 10, Name: "Caterpie", "Type 1": "Bug", "Type 2": "", HP: 45, Attack: 30, Defense: 35, "Sp. Atk": 20, "Sp. Def": 20, Speed: 45, Generation: 1, Legendary: false },
  { "#": 11, Name: "Metapod", "Type 1": "Bug", "Type 2": "", HP: 50, Attack: 20, Defense: 55, "Sp. Atk": 25, "Sp. Def": 25, Speed: 30, Generation: 1, Legendary: false },
  { "#": 12, Name: "Butterfree", "Type 1": "Bug", "Type 2": "Flying", HP: 60, Attack: 45, Defense: 50, "Sp. Atk": 90, "Sp. Def": 80, Speed: 70, Generation: 1, Legendary: false },
  { "#": 13, Name: "Weedle", "Type 1": "Bug", "Type 2": "Poison", HP: 40, Attack: 35, Defense: 30, "Sp. Atk": 20, "Sp. Def": 20, Speed: 50, Generation: 1, Legendary: false },
  { "#": 25, Name: "Pikachu", "Type 1": "Electric", "Type 2": "", HP: 35, Attack: 55, Defense: 40, "Sp. Atk": 50, "Sp. Def": 50, Speed: 90, Generation: 1, Legendary: false },
  { "#": 26, Name: "Raichu", "Type 1": "Electric", "Type 2": "", HP: 60, Attack: 90, Defense: 55, "Sp. Atk": 90, "Sp. Def": 80, Speed: 110, Generation: 1, Legendary: false },
  { "#": 35, Name: "Clefairy", "Type 1": "Fairy", "Type 2": "", HP: 70, Attack: 45, Defense: 48, "Sp. Atk": 60, "Sp. Def": 65, Speed: 35, Generation: 1, Legendary: false },
  { "#": 36, Name: "Clefable", "Type 1": "Fairy", "Type 2": "", HP: 95, Attack: 70, Defense: 73, "Sp. Atk": 95, "Sp. Def": 90, Speed: 60, Generation: 1, Legendary: false },
  { "#": 39, Name: "Jigglypuff", "Type 1": "Normal", "Type 2": "Fairy", HP: 115, Attack: 45, Defense: 20, "Sp. Atk": 45, "Sp. Def": 25, Speed: 20, Generation: 1, Legendary: false },
  { "#": 52, Name: "Meowth", "Type 1": "Normal", "Type 2": "", HP: 40, Attack: 45, Defense: 35, "Sp. Atk": 40, "Sp. Def": 40, Speed: 90, Generation: 1, Legendary: false },
  { "#": 54, Name: "Psyduck", "Type 1": "Water", "Type 2": "", HP: 50, Attack: 52, Defense: 48, "Sp. Atk": 65, "Sp. Def": 50, Speed: 55, Generation: 1, Legendary: false },
  { "#": 58, Name: "Growlithe", "Type 1": "Fire", "Type 2": "", HP: 55, Attack: 70, Defense: 45, "Sp. Atk": 70, "Sp. Def": 50, Speed: 60, Generation: 1, Legendary: false },
  { "#": 59, Name: "Arcanine", "Type 1": "Fire", "Type 2": "", HP: 90, Attack: 110, Defense: 80, "Sp. Atk": 100, "Sp. Def": 80, Speed: 95, Generation: 1, Legendary: false },
  { "#": 63, Name: "Abra", "Type 1": "Psychic", "Type 2": "", HP: 25, Attack: 20, Defense: 15, "Sp. Atk": 105, "Sp. Def": 55, Speed: 90, Generation: 1, Legendary: false },
  { "#": 66, Name: "Machop", "Type 1": "Fighting", "Type 2": "", HP: 70, Attack: 80, Defense: 50, "Sp. Atk": 35, "Sp. Def": 35, Speed: 35, Generation: 1, Legendary: false },
  { "#": 74, Name: "Geodude", "Type 1": "Rock", "Type 2": "Ground", HP: 40, Attack: 80, Defense: 100, "Sp. Atk": 30, "Sp. Def": 30, Speed: 20, Generation: 1, Legendary: false },
  { "#": 79, Name: "Slowpoke", "Type 1": "Water", "Type 2": "Psychic", HP: 90, Attack: 65, Defense: 65, "Sp. Atk": 40, "Sp. Def": 40, Speed: 15, Generation: 1, Legendary: false },
  { "#": 94, Name: "Gengar", "Type 1": "Ghost", "Type 2": "Poison", HP: 60, Attack: 65, Defense: 60, "Sp. Atk": 130, "Sp. Def": 75, Speed: 110, Generation: 1, Legendary: false },
  { "#": 113, Name: "Chansey", "Type 1": "Normal", "Type 2": "", HP: 250, Attack: 5, Defense: 5, "Sp. Atk": 35, "Sp. Def": 105, Speed: 50, Generation: 1, Legendary: false },
  { "#": 130, Name: "Gyarados", "Type 1": "Water", "Type 2": "Flying", HP: 95, Attack: 125, Defense: 79, "Sp. Atk": 60, "Sp. Def": 100, Speed: 81, Generation: 1, Legendary: false },
  { "#": 131, Name: "Lapras", "Type 1": "Water", "Type 2": "Ice", HP: 130, Attack: 85, Defense: 80, "Sp. Atk": 85, "Sp. Def": 95, Speed: 60, Generation: 1, Legendary: false },
  { "#": 133, Name: "Eevee", "Type 1": "Normal", "Type 2": "", HP: 55, Attack: 55, Defense: 50, "Sp. Atk": 45, "Sp. Def": 65, Speed: 55, Generation: 1, Legendary: false },
  { "#": 143, Name: "Snorlax", "Type 1": "Normal", "Type 2": "", HP: 160, Attack: 110, Defense: 65, "Sp. Atk": 65, "Sp. Def": 110, Speed: 30, Generation: 1, Legendary: false },
  { "#": 144, Name: "Articuno", "Type 1": "Ice", "Type 2": "Flying", HP: 90, Attack: 85, Defense: 100, "Sp. Atk": 95, "Sp. Def": 125, Speed: 85, Generation: 1, Legendary: true },
  { "#": 145, Name: "Zapdos", "Type 1": "Electric", "Type 2": "Flying", HP: 90, Attack: 90, Defense: 85, "Sp. Atk": 125, "Sp. Def": 90, Speed: 100, Generation: 1, Legendary: true },
  { "#": 146, Name: "Moltres", "Type 1": "Fire", "Type 2": "Flying", HP: 90, Attack: 100, Defense: 90, "Sp. Atk": 125, "Sp. Def": 85, Speed: 90, Generation: 1, Legendary: true },
  { "#": 147, Name: "Dratini", "Type 1": "Dragon", "Type 2": "", HP: 41, Attack: 64, Defense: 45, "Sp. Atk": 50, "Sp. Def": 50, Speed: 50, Generation: 1, Legendary: false },
  { "#": 149, Name: "Dragonite", "Type 1": "Dragon", "Type 2": "Flying", HP: 91, Attack: 134, Defense: 95, "Sp. Atk": 100, "Sp. Def": 100, Speed: 80, Generation: 1, Legendary: false },
  { "#": 150, Name: "Mewtwo", "Type 1": "Psychic", "Type 2": "", HP: 106, Attack: 110, Defense: 90, "Sp. Atk": 154, "Sp. Def": 90, Speed: 130, Generation: 1, Legendary: true },
  { "#": 151, Name: "Mew", "Type 1": "Psychic", "Type 2": "", HP: 100, Attack: 100, Defense: 100, "Sp. Atk": 100, "Sp. Def": 100, Speed: 100, Generation: 1, Legendary: false },
  { "#": 152, Name: "Chikorita", "Type 1": "Grass", "Type 2": "", HP: 45, Attack: 49, Defense: 65, "Sp. Atk": 49, "Sp. Def": 65, Speed: 45, Generation: 2, Legendary: false },
  { "#": 155, Name: "Cyndaquil", "Type 1": "Fire", "Type 2": "", HP: 39, Attack: 52, Defense: 43, "Sp. Atk": 60, "Sp. Def": 50, Speed: 65, Generation: 2, Legendary: false },
  { "#": 158, Name: "Totodile", "Type 1": "Water", "Type 2": "", HP: 50, Attack: 65, Defense: 64, "Sp. Atk": 44, "Sp. Def": 48, Speed: 43, Generation: 2, Legendary: false },
  { "#": 175, Name: "Togepi", "Type 1": "Fairy", "Type 2": "", HP: 35, Attack: 20, Defense: 65, "Sp. Atk": 40, "Sp. Def": 65, Speed: 20, Generation: 2, Legendary: false },
  { "#": 179, Name: "Mareep", "Type 1": "Electric", "Type 2": "", HP: 55, Attack: 40, Defense: 40, "Sp. Atk": 65, "Sp. Def": 45, Speed: 35, Generation: 2, Legendary: false },
  { "#": 196, Name: "Espeon", "Type 1": "Psychic", "Type 2": "", HP: 65, Attack: 65, Defense: 60, "Sp. Atk": 130, "Sp. Def": 95, Speed: 110, Generation: 2, Legendary: false },
  { "#": 197, Name: "Umbreon", "Type 1": "Dark", "Type 2": "", HP: 95, Attack: 65, Defense: 110, "Sp. Atk": 60, "Sp. Def": 130, Speed: 65, Generation: 2, Legendary: false },
  { "#": 212, Name: "Scizor", "Type 1": "Bug", "Type 2": "Steel", HP: 70, Attack: 130, Defense: 100, "Sp. Atk": 55, "Sp. Def": 80, Speed: 65, Generation: 2, Legendary: false },
  { "#": 230, Name: "Kingdra", "Type 1": "Water", "Type 2": "Dragon", HP: 75, Attack: 95, Defense: 95, "Sp. Atk": 95, "Sp. Def": 95, Speed: 85, Generation: 2, Legendary: false },
  { "#": 243, Name: "Raikou", "Type 1": "Electric", "Type 2": "", HP: 90, Attack: 85, Defense: 75, "Sp. Atk": 115, "Sp. Def": 100, Speed: 115, Generation: 2, Legendary: true },
  { "#": 244, Name: "Entei", "Type 1": "Fire", "Type 2": "", HP: 115, Attack: 115, Defense: 85, "Sp. Atk": 90, "Sp. Def": 75, Speed: 100, Generation: 2, Legendary: true },
  { "#": 245, Name: "Suicune", "Type 1": "Water", "Type 2": "", HP: 100, Attack: 75, Defense: 115, "Sp. Atk": 90, "Sp. Def": 115, Speed: 85, Generation: 2, Legendary: true },
  { "#": 249, Name: "Lugia", "Type 1": "Psychic", "Type 2": "Flying", HP: 106, Attack: 90, Defense: 130, "Sp. Atk": 90, "Sp. Def": 154, Speed: 110, Generation: 2, Legendary: true },
  { "#": 250, Name: "Ho-oh", "Type 1": "Fire", "Type 2": "Flying", HP: 106, Attack: 130, Defense: 90, "Sp. Atk": 110, "Sp. Def": 154, Speed: 90, Generation: 2, Legendary: true },
  { "#": 252, Name: "Treecko", "Type 1": "Grass", "Type 2": "", HP: 40, Attack: 45, Defense: 35, "Sp. Atk": 65, "Sp. Def": 55, Speed: 70, Generation: 3, Legendary: false },
  { "#": 255, Name: "Torchic", "Type 1": "Fire", "Type 2": "", HP: 45, Attack: 60, Defense: 40, "Sp. Atk": 70, "Sp. Def": 50, Speed: 45, Generation: 3, Legendary: false },
  { "#": 258, Name: "Mudkip", "Type 1": "Water", "Type 2": "", HP: 50, Attack: 70, Defense: 50, "Sp. Atk": 50, "Sp. Def": 50, Speed: 40, Generation: 3, Legendary: false },
  { "#": 282, Name: "Gardevoir", "Type 1": "Psychic", "Type 2": "Fairy", HP: 68, Attack: 65, Defense: 65, "Sp. Atk": 125, "Sp. Def": 115, Speed: 80, Generation: 3, Legendary: false },
  { "#": 302, Name: "Sableye", "Type 1": "Dark", "Type 2": "Ghost", HP: 50, Attack: 75, Defense: 75, "Sp. Atk": 65, "Sp. Def": 65, Speed: 50, Generation: 3, Legendary: false },
  { "#": 330, Name: "Flygon", "Type 1": "Ground", "Type 2": "Dragon", HP: 80, Attack: 100, Defense: 80, "Sp. Atk": 80, "Sp. Def": 80, Speed: 100, Generation: 3, Legendary: false },
  { "#": 334, Name: "Altaria", "Type 1": "Dragon", "Type 2": "Flying", HP: 75, Attack: 70, Defense: 90, "Sp. Atk": 70, "Sp. Def": 105, Speed: 80, Generation: 3, Legendary: false },
  { "#": 350, Name: "Milotic", "Type 1": "Water", "Type 2": "", HP: 95, Attack: 60, Defense: 79, "Sp. Atk": 100, "Sp. Def": 125, Speed: 81, Generation: 3, Legendary: false },
  { "#": 359, Name: "Absol", "Type 1": "Dark", "Type 2": "", HP: 65, Attack: 130, Defense: 60, "Sp. Atk": 75, "Sp. Def": 60, Speed: 75, Generation: 3, Legendary: false },
  { "#": 371, Name: "Bagon", "Type 1": "Dragon", "Type 2": "", HP: 45, Attack: 75, Defense: 60, "Sp. Atk": 40, "Sp. Def": 30, Speed: 50, Generation: 3, Legendary: false },
  { "#": 373, Name: "Salamence", "Type 1": "Dragon", "Type 2": "Flying", HP: 95, Attack: 135, Defense: 80, "Sp. Atk": 110, "Sp. Def": 80, Speed: 100, Generation: 3, Legendary: false },
  { "#": 376, Name: "Metagross", "Type 1": "Steel", "Type 2": "Psychic", HP: 80, Attack: 135, Defense: 130, "Sp. Atk": 95, "Sp. Def": 90, Speed: 70, Generation: 3, Legendary: false },
  { "#": 377, Name: "Regirock", "Type 1": "Rock", "Type 2": "", HP: 80, Attack: 100, Defense: 200, "Sp. Atk": 50, "Sp. Def": 100, Speed: 50, Generation: 3, Legendary: true },
  { "#": 378, Name: "Regice", "Type 1": "Ice", "Type 2": "", HP: 80, Attack: 50, Defense: 100, "Sp. Atk": 100, "Sp. Def": 200, Speed: 50, Generation: 3, Legendary: true },
  { "#": 379, Name: "Registeel", "Type 1": "Steel", "Type 2": "", HP: 80, Attack: 75, Defense: 150, "Sp. Atk": 75, "Sp. Def": 150, Speed: 50, Generation: 3, Legendary: true },
  { "#": 380, Name: "Latias", "Type 1": "Dragon", "Type 2": "Psychic", HP: 80, Attack: 80, Defense: 90, "Sp. Atk": 110, "Sp. Def": 130, Speed: 110, Generation: 3, Legendary: true },
  { "#": 381, Name: "Latios", "Type 1": "Dragon", "Type 2": "Psychic", HP: 80, Attack: 90, Defense: 80, "Sp. Atk": 130, "Sp. Def": 110, Speed: 110, Generation: 3, Legendary: true },
  { "#": 382, Name: "Kyogre", "Type 1": "Water", "Type 2": "", HP: 100, Attack: 100, Defense: 90, "Sp. Atk": 150, "Sp. Def": 140, Speed: 90, Generation: 3, Legendary: true },
  { "#": 383, Name: "Groudon", "Type 1": "Ground", "Type 2": "", HP: 100, Attack: 150, Defense: 140, "Sp. Atk": 100, "Sp. Def": 90, Speed: 90, Generation: 3, Legendary: true },
  { "#": 384, Name: "Rayquaza", "Type 1": "Dragon", "Type 2": "Flying", HP: 105, Attack: 150, Defense: 90, "Sp. Atk": 150, "Sp. Def": 90, Speed: 95, Generation: 3, Legendary: true },
  { "#": 385, Name: "Jirachi", "Type 1": "Steel", "Type 2": "Psychic", HP: 100, Attack: 100, Defense: 100, "Sp. Atk": 100, "Sp. Def": 100, Speed: 100, Generation: 3, Legendary: false },
  { "#": 386, Name: "Deoxys", "Type 1": "Psychic", "Type 2": "", HP: 50, Attack: 150, Defense: 50, "Sp. Atk": 150, "Sp. Def": 50, Speed: 150, Generation: 3, Legendary: false },
  { "#": 387, Name: "Turtwig", "Type 1": "Grass", "Type 2": "", HP: 55, Attack: 68, Defense: 64, "Sp. Atk": 45, "Sp. Def": 55, Speed: 31, Generation: 4, Legendary: false },
  { "#": 390, Name: "Chimchar", "Type 1": "Fire", "Type 2": "", HP: 44, Attack: 58, Defense: 44, "Sp. Atk": 58, "Sp. Def": 44, Speed: 61, Generation: 4, Legendary: false },
  { "#": 393, Name: "Piplup", "Type 1": "Water", "Type 2": "", HP: 53, Attack: 51, Defense: 53, "Sp. Atk": 61, "Sp. Def": 56, Speed: 40, Generation: 4, Legendary: false },
  { "#": 405, Name: "Luxray", "Type 1": "Electric", "Type 2": "", HP: 80, Attack: 120, Defense: 79, "Sp. Atk": 95, "Sp. Def": 79, Speed: 70, Generation: 4, Legendary: false },
  { "#": 418, Name: "Buizel", "Type 1": "Water", "Type 2": "", HP: 55, Attack: 65, Defense: 35, "Sp. Atk": 60, "Sp. Def": 30, Speed: 85, Generation: 4, Legendary: false },
  { "#": 430, Name: "Honchkrow", "Type 1": "Dark", "Type 2": "Flying", HP: 100, Attack: 125, Defense: 52, "Sp. Atk": 105, "Sp. Def": 52, Speed: 71, Generation: 4, Legendary: false },
  { "#": 444, Name: "Gabite", "Type 1": "Dragon", "Type 2": "Ground", HP: 68, Attack: 90, Defense: 65, "Sp. Atk": 50, "Sp. Def": 55, Speed: 82, Generation: 4, Legendary: false },
  { "#": 445, Name: "Garchomp", "Type 1": "Dragon", "Type 2": "Ground", HP: 108, Attack: 130, Defense: 95, "Sp. Atk": 80, "Sp. Def": 85, Speed: 102, Generation: 4, Legendary: false },
  { "#": 448, Name: "Lucario", "Type 1": "Fighting", "Type 2": "Steel", HP: 70, Attack: 110, Defense: 70, "Sp. Atk": 115, "Sp. Def": 70, Speed: 90, Generation: 4, Legendary: false },
  { "#": 461, Name: "Weavile", "Type 1": "Dark", "Type 2": "Ice", HP: 70, Attack: 120, Defense: 65, "Sp. Atk": 45, "Sp. Def": 85, Speed: 125, Generation: 4, Legendary: false },
  { "#": 470, Name: "Leafeon", "Type 1": "Grass", "Type 2": "", HP: 65, Attack: 110, Defense: 130, "Sp. Atk": 60, "Sp. Def": 65, Speed: 95, Generation: 4, Legendary: false },
  { "#": 471, Name: "Glaceon", "Type 1": "Ice", "Type 2": "", HP: 65, Attack: 60, Defense: 110, "Sp. Atk": 130, "Sp. Def": 95, Speed: 65, Generation: 4, Legendary: false },
  { "#": 474, Name: "Porygon-Z", "Type 1": "Normal", "Type 2": "", HP: 85, Attack: 80, Defense: 70, "Sp. Atk": 135, "Sp. Def": 75, Speed: 90, Generation: 4, Legendary: false },
  { "#": 480, Name: "Uxie", "Type 1": "Psychic", "Type 2": "", HP: 75, Attack: 75, Defense: 130, "Sp. Atk": 75, "Sp. Def": 130, Speed: 95, Generation: 4, Legendary: true },
  { "#": 481, Name: "Mesprit", "Type 1": "Psychic", "Type 2": "", HP: 80, Attack: 105, Defense: 105, "Sp. Atk": 105, "Sp. Def": 105, Speed: 80, Generation: 4, Legendary: true },
  { "#": 482, Name: "Azelf", "Type 1": "Psychic", "Type 2": "", HP: 75, Attack: 125, Defense: 70, "Sp. Atk": 125, "Sp. Def": 70, Speed: 115, Generation: 4, Legendary: true },
  { "#": 483, Name: "Dialga", "Type 1": "Steel", "Type 2": "Dragon", HP: 100, Attack: 120, Defense: 120, "Sp. Atk": 150, "Sp. Def": 100, Speed: 90, Generation: 4, Legendary: true },
  { "#": 484, Name: "Palkia", "Type 1": "Water", "Type 2": "Dragon", HP: 90, Attack: 120, Defense: 100, "Sp. Atk": 150, "Sp. Def": 120, Speed: 100, Generation: 4, Legendary: true },
  { "#": 487, Name: "Giratina", "Type 1": "Ghost", "Type 2": "Dragon", HP: 150, Attack: 100, Defense: 120, "Sp. Atk": 100, "Sp. Def": 120, Speed: 90, Generation: 4, Legendary: true },
  { "#": 488, Name: "Cresselia", "Type 1": "Psychic", "Type 2": "", HP: 120, Attack: 70, Defense: 120, "Sp. Atk": 75, "Sp. Def": 130, Speed: 85, Generation: 4, Legendary: true },
  { "#": 493, Name: "Arceus", "Type 1": "Normal", "Type 2": "", HP: 120, Attack: 120, Defense: 120, "Sp. Atk": 120, "Sp. Def": 120, Speed: 120, Generation: 4, Legendary: true },
  { "#": 495, Name: "Snivy", "Type 1": "Grass", "Type 2": "", HP: 45, Attack: 45, Defense: 55, "Sp. Atk": 45, "Sp. Def": 55, Speed: 63, Generation: 5, Legendary: false },
  { "#": 498, Name: "Tepig", "Type 1": "Fire", "Type 2": "", HP: 65, Attack: 63, Defense: 45, "Sp. Atk": 45, "Sp. Def": 45, Speed: 45, Generation: 5, Legendary: false },
  { "#": 501, Name: "Oshawott", "Type 1": "Water", "Type 2": "", HP: 55, Attack: 55, Defense: 45, "Sp. Atk": 63, "Sp. Def": 45, Speed: 45, Generation: 5, Legendary: false },
  { "#": 530, Name: "Excadrill", "Type 1": "Ground", "Type 2": "Steel", HP: 110, Attack: 135, Defense: 60, "Sp. Atk": 50, "Sp. Def": 65, Speed: 88, Generation: 5, Legendary: false },
  { "#": 545, Name: "Scolipede", "Type 1": "Bug", "Type 2": "Poison", HP: 60, Attack: 100, Defense: 89, "Sp. Atk": 55, "Sp. Def": 69, Speed: 112, Generation: 5, Legendary: false },
  { "#": 560, Name: "Scrafty", "Type 1": "Dark", "Type 2": "Fighting", HP: 65, Attack: 90, Defense: 115, "Sp. Atk": 45, "Sp. Def": 115, Speed: 58, Generation: 5, Legendary: false },
  { "#": 587, Name: "Emolga", "Type 1": "Electric", "Type 2": "Flying", HP: 55, Attack: 75, Defense: 60, "Sp. Atk": 75, "Sp. Def": 60, Speed: 103, Generation: 5, Legendary: false },
  { "#": 612, Name: "Haxorus", "Type 1": "Dragon", "Type 2": "", HP: 76, Attack: 147, Defense: 90, "Sp. Atk": 60, "Sp. Def": 70, Speed: 97, Generation: 5, Legendary: false },
  { "#": 635, Name: "Hydreigon", "Type 1": "Dark", "Type 2": "Dragon", HP: 92, Attack: 105, Defense: 90, "Sp. Atk": 125, "Sp. Def": 90, Speed: 98, Generation: 5, Legendary: false },
  { "#": 638, Name: "Cobalion", "Type 1": "Steel", "Type 2": "Fighting", HP: 91, Attack: 90, Defense: 129, "Sp. Atk": 90, "Sp. Def": 72, Speed: 108, Generation: 5, Legendary: true },
  { "#": 639, Name: "Terrakion", "Type 1": "Rock", "Type 2": "Fighting", HP: 91, Attack: 129, Defense: 90, "Sp. Atk": 72, "Sp. Def": 90, Speed: 108, Generation: 5, Legendary: true },
  { "#": 640, Name: "Virizion", "Type 1": "Grass", "Type 2": "Fighting", HP: 91, Attack: 90, Defense: 72, "Sp. Atk": 90, "Sp. Def": 129, Speed: 108, Generation: 5, Legendary: true },
  { "#": 641, Name: "Tornadus", "Type 1": "Flying", "Type 2": "", HP: 79, Attack: 115, Defense: 70, "Sp. Atk": 125, "Sp. Def": 80, Speed: 111, Generation: 5, Legendary: true },
  { "#": 642, Name: "Thundurus", "Type 1": "Electric", "Type 2": "Flying", HP: 79, Attack: 115, Defense: 70, "Sp. Atk": 125, "Sp. Def": 80, Speed: 111, Generation: 5, Legendary: true },
  { "#": 643, Name: "Reshiram", "Type 1": "Dragon", "Type 2": "Fire", HP: 100, Attack: 120, Defense: 100, "Sp. Atk": 150, "Sp. Def": 120, Speed: 90, Generation: 5, Legendary: true },
  { "#": 644, Name: "Zekrom", "Type 1": "Dragon", "Type 2": "Electric", HP: 100, Attack: 150, Defense: 120, "Sp. Atk": 120, "Sp. Def": 100, Speed: 90, Generation: 5, Legendary: true },
  { "#": 645, Name: "Landorus", "Type 1": "Ground", "Type 2": "Flying", HP: 89, Attack: 125, Defense: 90, "Sp. Atk": 115, "Sp. Def": 80, Speed: 101, Generation: 5, Legendary: true },
  { "#": 646, Name: "Kyurem", "Type 1": "Dragon", "Type 2": "Ice", HP: 125, Attack: 130, Defense: 90, "Sp. Atk": 130, "Sp. Def": 90, Speed: 95, Generation: 5, Legendary: true },
  { "#": 650, Name: "Chespin", "Type 1": "Grass", "Type 2": "", HP: 56, Attack: 61, Defense: 65, "Sp. Atk": 48, "Sp. Def": 45, Speed: 38, Generation: 6, Legendary: false },
  { "#": 653, Name: "Fennekin", "Type 1": "Fire", "Type 2": "", HP: 40, Attack: 45, Defense: 40, "Sp. Atk": 62, "Sp. Def": 60, Speed: 60, Generation: 6, Legendary: false },
  { "#": 656, Name: "Froakie", "Type 1": "Water", "Type 2": "", HP: 41, Attack: 56, Defense: 40, "Sp. Atk": 62, "Sp. Def": 44, Speed: 71, Generation: 6, Legendary: false },
  { "#": 658, Name: "Greninja", "Type 1": "Water", "Type 2": "Dark", HP: 72, Attack: 95, Defense: 67, "Sp. Atk": 103, "Sp. Def": 71, Speed: 122, Generation: 6, Legendary: false },
  { "#": 669, Name: "Flabebe", "Type 1": "Fairy", "Type 2": "", HP: 44, Attack: 38, Defense: 39, "Sp. Atk": 61, "Sp. Def": 79, Speed: 42, Generation: 6, Legendary: false },
  { "#": 700, Name: "Sylveon", "Type 1": "Fairy", "Type 2": "", HP: 95, Attack: 65, Defense: 65, "Sp. Atk": 110, "Sp. Def": 130, Speed: 60, Generation: 6, Legendary: false },
  { "#": 701, Name: "Hawlucha", "Type 1": "Fighting", "Type 2": "Flying", HP: 78, Attack: 92, Defense: 75, "Sp. Atk": 74, "Sp. Def": 63, Speed: 118, Generation: 6, Legendary: false },
  { "#": 716, Name: "Xerneas", "Type 1": "Fairy", "Type 2": "", HP: 126, Attack: 131, Defense: 95, "Sp. Atk": 131, "Sp. Def": 98, Speed: 99, Generation: 6, Legendary: true },
  { "#": 717, Name: "Yveltal", "Type 1": "Dark", "Type 2": "Flying", HP: 126, Attack: 131, Defense: 95, "Sp. Atk": 131, "Sp. Def": 98, Speed: 99, Generation: 6, Legendary: true },
  { "#": 718, Name: "Zygarde", "Type 1": "Dragon", "Type 2": "Ground", HP: 108, Attack: 100, Defense: 121, "Sp. Atk": 81, "Sp. Def": 95, Speed: 95, Generation: 6, Legendary: true },
  { "#": 719, Name: "Diancie", "Type 1": "Rock", "Type 2": "Fairy", HP: 50, Attack: 100, Defense: 150, "Sp. Atk": 100, "Sp. Def": 150, Speed: 50, Generation: 6, Legendary: false },
  { "#": 720, Name: "Hoopa", "Type 1": "Psychic", "Type 2": "Ghost", HP: 80, Attack: 110, Defense: 60, "Sp. Atk": 150, "Sp. Def": 130, Speed: 70, Generation: 6, Legendary: false },
  { "#": 721, Name: "Volcanion", "Type 1": "Fire", "Type 2": "Water", HP: 80, Attack: 110, Defense: 120, "Sp. Atk": 130, "Sp. Def": 90, Speed: 70, Generation: 6, Legendary: false },
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
