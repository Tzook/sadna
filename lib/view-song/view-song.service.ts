import {Http, Response} from '@angular/http';
import {GET_SONG_URL} from './view-song.constants';
import {ROUTE_VIEW_SONG} from '../navigation/routes.constants';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Song} from '../db/server-db.model';

@Injectable()
export class ViewSongService {

    constructor(private http: Http) { }

    public getSong(id: string): Observable<Response> {
        return this.http.get(GET_SONG_URL.replace(":id", id));
    }

    public getSongUrl(song: Song): string {
        return "/" + ROUTE_VIEW_SONG
                        .replace(":id", "" + song.id)
                        .replace(":name", song.name)
                        .replace(":writer", "" + song.writer)
                        .replace(":composer", "" + song.composer);
    }
}