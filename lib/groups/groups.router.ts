import { Injectable } from '@angular/core';
import {GroupsController} from './groups.controller';
import {GroupsService} from './server-groups.service';
import {GroupsMiddleware} from './groups.middleware';
import {ADD_GROUP_URL, GET_GROUPS_URL, GET_SINGLE_GROUP_URL, GET_EXPRESSION_VALUES_URL} from './groups.constants';

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
            this.groupsMiddleware.processGroup.bind(this.groupsMiddleware),
            this.groupsController.insertGroup.bind(this.groupsController));

        app.get(GET_GROUPS_URL,
            this.groupsController.returnGroups.bind(this.groupsController));

        app.get(GET_SINGLE_GROUP_URL,
            this.groupsController.returnSingleGroup.bind(this.groupsController));

        app.get(GET_EXPRESSION_VALUES_URL,
            this.groupsMiddleware.processExpression.bind(this.groupsMiddleware),
            this.groupsController.returnExpressionValues.bind(this.groupsController));

        // TODO add modify group route and action
    }
}