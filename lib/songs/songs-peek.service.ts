import {Http, Response} from '@angular/http';
import {GET_SONGS_BY_WORD_URL} from '../songs-list/songs-list.constants';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SongsPeekService {

    constructor(private http: Http) {}

    public getSongs(word: string): Observable<Response> {
        return this.http.get(GET_SONGS_BY_WORD_URL.replace(":word", word));
    }
}