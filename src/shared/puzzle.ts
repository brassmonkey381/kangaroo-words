const PuzzleRow {
  joey_word: string;
  kangaroo_word: string;
  joey_indices: [index: number]: number;
  kangaroo_unfilled: [index: number]: string;
  joey_clue: string;
}

export interface Puzzle {
    id: number;
    letterbank: string[];
    letterbank_update: string[];
    puzzle_rows: PuzzleRow[];
};