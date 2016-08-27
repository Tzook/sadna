import {Http, Response} from '@angular/http';
import {GET_SONG_URL} from './view-song.constants';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ViewSongService {

    constructor(private http: Http) { }

    public getSong(id: string): Observable<Response> {
        return this.http.get(GET_SONG_URL.replace(":id", id));
    }
}