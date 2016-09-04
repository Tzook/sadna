import {Injectable} from '@angular/core';
import {GroupsService} from "./server-groups.service";
import {AddGroup} from './add-group.model';
import {WordsSeparatorService} from '../words/words-separator.service';
import {Word, GroupResult} from '../db/server-db.model';
import * as e from "express";

@Injectable()
export class GroupsController {

    constructor(private groupsService: GroupsService,
                private wordsSeparatorService: WordsSeparatorService) { }

    public processGroup(req: e.Request, res: e.Response, next: Function) {
        let model: AddGroup = req.body.model;
        let wordsStrings = this.wordsSeparatorService.separate(model.words);
        req.body.words = [];
        let i = 0;
        for (let word of wordsStrings) {
            req.body.words[i++] = {
                value: word
            }
        }
        next();
    }

    public insertGroup(req: e.Request, res: e.Response, next: Function) {
        this.groupsService.loadGroup(req.body.model, req.body.words)
            .then(() => res.send())
            .catch(e => next(e));
    }

    public returnGroups(req: e.Request, res: e.Response, next: Function) {
        this.groupsService.selectGroups()
            .then((result: GroupResult) => {
                res.send(result.rows);
            })
            .catch(e => {
                next("Error while fetching groups list" + e);
            });
    }
}