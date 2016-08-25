import {headers} from 'popsicle/dist/plugins';
import {ROUTE_URL} from './add-song.constants';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {SongObject} from './song.object';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AddSongService {

    constructor(private http: Http) {

    }

    public addSong(song: SongObject) {
        let body = JSON.stringify({
            123: 345
        });
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});

        return this.http.post(ROUTE_URL, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || ' error');
    }
}