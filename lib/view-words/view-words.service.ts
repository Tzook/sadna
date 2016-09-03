import {Http, Response} from '@angular/http';
import {GET_WORDS_URL} from './view-words.constants';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ViewWordsService {

    constructor(private http: Http) {}

    public getWords(): Observable<Response> {
        return this.http.get(GET_WORDS_URL);
    }
}