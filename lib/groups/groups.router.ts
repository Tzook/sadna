import { Injectable } from '@angular/core';
import {GroupsController} from './groups.controller';
import {GroupsMiddleware} from './groups.middleware';
import {GET_GROUPS_URL, ADD_GROUP_URL} from './groups.constants';

@Injectable()
export class GroupsRouter {

    constructor(private groupsMiddleware: GroupsMiddleware,
                private groupsController: GroupsController) { }

    init(app) {
        app.post(ADD_GROUP_URL,
            this.groupsMiddleware.validateRequest.bind(this.groupsMiddleware),
            this.groupsController.processGroup.bind(this.groupsController),
            this.groupsController.insertGroup.bind(this.groupsController));

        app.get(GET_GROUPS_URL,
            this.groupsController.returnGroups.bind(this.groupsController))
    }
}