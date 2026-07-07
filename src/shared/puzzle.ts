export interface DictNum {
  [x: string]: any; // allows `indexOf` to be called
  [index: number]: number;
}

export interface DictStr {
  [x: string]: any; // allows `indexOf` to be called
  [index: number]: string;
}

export interface PuzzleRow {
  joey_word: string;
  kangaroo_word: string;
  joey_indices: DictNum;
  kangaroo_unfilled: DictStr;
  joey_clue: string;
};

export interface Puzzle {
    id: number;
    letterbank: string[];
    letterbank_update: string[];
    puzzle_rows: PuzzleRow[];
};
