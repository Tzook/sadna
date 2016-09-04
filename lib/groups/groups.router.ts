import { Injectable } from '@angular/core';
import {GroupsController} from './groups.controller';
import {GroupsService} from './server-groups.service';
import {GroupsMiddleware} from './groups.middleware';
import {GET_GROUPS_URL, ADD_GROUP_URL} from './groups.constants';

@Injectable()
export class GroupsRouter {

    constructor(private groupsMiddleware: GroupsMiddleware,
                private groupsController: GroupsController,
                private groupsService: GroupsService) { }

    init(app) {
        // init the needed functions to make sure they are in the DB
        this.groupsService.initNextWordFunctions();
        app.post(ADD_GROUP_URL,
            this.groupsMiddleware.validateRequest.bind(this.groupsMiddleware),
            this.groupsController.processGroup.bind(this.groupsController),
            this.groupsController.insertGroup.bind(this.groupsController));

        app.get(GET_GROUPS_URL,
            this.groupsController.returnGroups.bind(this.groupsController));
    // // working example of search for Tzookie:
    //    this.groupsService.getWordGroupPossibilities("in my genes i got a laptop in my back".split(' '))
    //        .then((d) => {
    //            console.log(d.rows);
    //        })
    //        .catch(e => {
    //            console.log('err', e);
    //        });
    }
}