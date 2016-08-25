import {ROUTE_URL} from './add-song.constants';
import {Injectable} from '@angular/core';

@Injectable()
export class AddSongRouter {
    constructor() { }

    init(app) {
        app.post(ROUTE_URL, log);

        function log() {
            console.log('in log!!!');
        }
    }
}