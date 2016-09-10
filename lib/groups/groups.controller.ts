import {Injectable} from '@angular/core';
import {GroupsService} from "./server-groups.service";
import {AddGroup} from './add-group.model';
import {Word, GroupResult, CompleteWordInGroupResult} from '../db/server-db.model';
import * as e from "express";

@Injectable()
export class GroupsController {

    constructor(private groupsService: GroupsService) { }

    public insertGroup(req: e.Request, res: e.Response, next: Function) {
        this.groupsService.loadGroup(req.body.model, req.body.words)
            .then(() => res.send())
            .catch(e => next(e));
    }

    public updateGroup(req: e.Request, res: e.Response, next: Function) {
        this.groupsService.updateGroup(req.body.model.id, req.body.words)
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

    public returnExpressionValues(req: e.Request, res: e.Response, next: Function) {
        this.groupsService.getWordGroupPossibilities(req.body.words)
           .then((result) => {
               console.log(result.rows);
               res.send(result.rows);
           })
           .catch(e => {
               console.log("Error while fetching expression possibilities", e);
           });
    }
}