import { Injectable } from '@angular/core';
import { Puzzle, PuzzleRows } from '../../shared/puzzle';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { baseURL } from '../../shared/baseurl';
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
export class  PuzzleProvider {

  constructor(public http: Http,
              private processHTTPMsgService: ProcessHttpmsgProvider) { }

  getPuzzles(): Observable<Puzzle[]> {
    return this.http.get(baseURL + 'puzzles')
                    .map(res => { return this.processHTTPMsgService.extractData(res); })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getPuzzle(id: number): Observable<Puzzle> {
    return  this.http.get(baseURL + 'puzzles/'+ id)
                    .map(res => { return this.processHTTPMsgService.extractData(res); })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

}
