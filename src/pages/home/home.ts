import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Puzzle, PuzzleRow} from '../../shared/puzzle';
import { PuzzleDbService } from '../../providers/puzzle-db/puzzle-db';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {
  puzzle: Puzzle;
  puzzleErrMess: string;
  guess_value: string = "";
  guess_indicies: number[][] = [[],[],[],[]];
  my_puzzle_db: Puzzle[];
  puzzle_id: number = 0;

  constructor(public navCtrl: NavController,
    //private puzzleservice: PuzzleProvider,
    private puzzledbservice: PuzzleDbService) {}//,
    //@Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    //this.my_puzzle_db = this.puzzledbservice.getPuzzles();
    //this.puzzle = this.my_puzzle_db.getPuzzle(0)

    this.my_puzzle_db = this.puzzledbservice.getPuzzles()
    this.puzzle = this.puzzledbservice.getPuzzleLevel(this.puzzle_id)

    //this.puzzle = this.puzzledbservice.getPuzzleLevel(0)
    //  .subscribe(puzzle => this.puzzle = puzzle)

    // this.puzzle = this.puzzleservice.getPuzzle(0)
    //   .subscribe(puzzle => this.puzzle = puzzle)
    //   errmess => this.puzzleErrMess = <any>errmess
  }

  valuechange(newValue) {
    console.log(newValue)
    if(this.puzzledbservice.getPuzzleLevel(newValue) != null){
      this.puzzle = this.puzzledbservice.getPuzzleLevel(newValue)
    }
  }

  onReset(){
    this.puzzle.puzzle_rows.forEach((row, i) =>{
      if (this.guess_value.toLowerCase() == row.joey_word){

      } else{
        console.log(this.guess_indicies[i])
        const guess_ix: number;
        const guess_val: number;
          for(let guess_ix in this.guess_indicies[i]){
            guess_val = this.guess_indicies[i][guess_ix];
             console.log(guess_val);
            this.puzzle.puzzle_rows[i].kangaroo_unfilled[guess_val] = "_";
        }
      }
    })
   this.guess_value='';
   this.puzzle.letterbank_update = Object.assign([], this.puzzle.letterbank);
   this.guess_indicies = Object.assign([], [[],[],[],[]]);
  }

  onSelect(letter: string){
    this.guess_value = this.guess_value + letter
    const index: number = this.puzzle.letterbank_update.indexOf(letter);
    this.puzzle.letterbank_update.splice(index, 1); 
  }

  fillNextBlank(letter): number {
    //Get the index of the next blank in this character array
    this.puzzle.puzzle_rows.forEach((row, i) =>{
      // TODO: if this row is solved, skip?
        const ix: number = row.kangaroo_unfilled.indexOf("_");
        if (ix >= 0){
          row.kangaroo_unfilled[ix] = letter;
          this.guess_indicies[i].push(ix);
        }
    })
    console.log(this.guess_indicies);
  }

  checkSolution(){
    //See if any of the "filled words" match a joey word
    this.puzzle.puzzle_rows.forEach((row, i) =>{
      if (this.guess_value.toLowerCase() == row.joey_word){
        const w: string;
        w = this.guess_value.toUpperCase().split('');
        console.log("JOEY FOUND: ", w)
        const index: number;
        for (let l in w){
          index = this.puzzle.letterbank.indexOf(w[l]);
          console.log(index)
          this.puzzle.letterbank.splice(index, 1); 
        }
        this.onReset()
      }
    })
  }

  getStyle(unfilled_char: string, flag: bool): string{
    if(flag){
      return("green")
    }
    else if((unfilled_char != "_") && (unfilled_char == unfilled_char.toUpperCase())){
      return("green")
    } else{
      return("primary")
    }
  }
}




