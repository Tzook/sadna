import {Injectable} from '@angular/core';
import {AddSong} from './add-song.model';
import {MIN_SONG_LENGTH, MAX_SONG_LENGTH, MAX_NAME_LENGTH} from './add-song.constants';
import * as e from "express";

@Injectable()
export class AddSongMiddleware {

    validateRequest(req: e.Request, res: e.Response, next: Function) {
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
        return this.validateParams(model, params);
    }

    private validateParams(model: AddSong, params: {name: string, type: string, min: number, max: number}[]): string {
        for (let param of params) {
            let name = param.name, type = param.type, min = param.min, max = param.max;

            if (typeof model[name] !== type || model[name].length <= min || model[name].length > max) {
                return `Expected field '${name}' to be a ${type} between ${min} and ${max}. Instead got ${model[name]}.`;
            }
        }
        return "";
    }
}