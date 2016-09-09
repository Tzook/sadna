import {Injectable} from '@angular/core';
import {GroupsService} from "./server-groups.service";
import {AddGroup} from './add-group.model';
import {WordsSeparatorService} from '../words/words-separator.service';
import {Word, GroupResult, CompleteWordInGroupResult} from '../db/server-db.model';
import * as e from "express";

@Injectable()
export class GroupsController {

    constructor(private groupsService: GroupsService,
                private wordsSeparatorService: WordsSeparatorService) { }

    public processGroup(req: e.Request, res: e.Response, next: Function) {
        let model: AddGroup = req.body.model;
        req.body.words = this.wordsSeparatorService.separate(model.words);
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

    public returnSingleGroup(req: e.Request, res: e.Response, next: Function) {
        this.groupsService.selectGroup(req.params.id)
            .then((result: CompleteWordInGroupResult) => {
                res.send(result.rows);
            })
            .catch(e => {
                next("Error while fetching groups list" + e);
            });
    }
}