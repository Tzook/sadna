import {Injectable} from '@angular/core';
import {WordsService} from "../words/server-words.service";
import {WordResult} from '../db/server-db.model';
import * as e from "express";

@Injectable()
export class ViewWordsController {

    constructor(private wordsService: WordsService) {}

    public returnWords(req: e.Request, res: e.Response, next: Function) {
        this.wordsService.selectUniqueWords()
            .then((result: WordResult) => {
                res.send(result.rows);
            })
            .catch(e => {
                next("Error while fetching words list" + e);
            });
    }
}