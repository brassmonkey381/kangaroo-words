import { Injectable } from '@angular/core';
import { Puzzle } from '../../shared/puzzle';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { PUZZLE_DB } from '../../shared/puzzle_db';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

/*
  Generated class for the PromotionProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class  PuzzleDbService {

  constructor(public http: Http,
              private processHTTPMsgService: ProcessHttpmsgProvider) { }

	getPuzzles(): Puzzle[] {
		return PUZZLE_DB;
	}; 

	getPuzzleLevel(id: number): Puzzle{
		return PUZZLE_DB[id];
	};
}
