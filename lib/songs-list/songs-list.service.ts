import {GET_SONGS_LIST_URL} from './songs-list.constants';
import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SongsListService {

    constructor(private http: Http) {}

    public getSongs(): Observable<Response> {
        return this.http.get(GET_SONGS_LIST_URL);
    }
}