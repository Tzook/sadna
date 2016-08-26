import {AddSongMiddleware} from './add-song.middleware';
import {ROUTE_URL} from './add-song.constants';
import {Injectable} from '@angular/core';

@Injectable()
export class AddSongRouter {
    constructor(private addSongMiddleware: AddSongMiddleware) { }

    init(app) {
        app.post(ROUTE_URL,
            this.addSongMiddleware.validateRequest.bind(this.addSongMiddleware));
    }
}