import {ADD_SONG_URL} from './add-song.constants';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {AddSong} from './add-song.model';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AddSongService {

    constructor(private http: Http) {}

    public addSong(song: AddSong): Observable<Response> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});

        return this.http.post(ADD_SONG_URL, JSON.stringify(song), options);
    }
}