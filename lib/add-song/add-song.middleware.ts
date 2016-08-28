import {Injectable} from '@angular/core';
import {AddSong} from './add-song.model';
import {ParamsValidators} from '../Components/params.validator';
import {MIN_SONG_LENGTH, MAX_SONG_LENGTH, MAX_NAME_LENGTH} from './add-song.constants';
import * as e from "express";

@Injectable()
export class AddSongMiddleware {

	constructor(private paramsValidators: ParamsValidators) {}

    public validateRequest(req: e.Request, res: e.Response, next: Function) {
        let body = req.body;
        let model = new AddSong(body.name, body.writer, body.composer, body.text);
        let error = this.validateModel(model)
        if (!error) {
            req.body.model = model;
            next();
        }  else {
            next("Invalid parameter: " + error);
        }
    }

    private validateModel(model: AddSong): string {
        let params = [
            { name: "name", type: "string", min: 0, max: MAX_NAME_LENGTH },
            { name: "writer", type: "string", min: 0, max: MAX_NAME_LENGTH },
            { name: "composer", type: "string", min: 0, max: MAX_NAME_LENGTH },
            { name: "text", type: "string", min: MIN_SONG_LENGTH, max: MAX_SONG_LENGTH },
        ]
        return this.paramsValidators.validateParams(model, params);
    }
}