"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var groups_controller_1 = require('./groups.controller');
var server_groups_service_1 = require('./server-groups.service');
var groups_middleware_1 = require('./groups.middleware');
var groups_constants_1 = require('./groups.constants');
var GroupsRouter = (function () {
    function GroupsRouter(groupsMiddleware, groupsController, groupsService) {
        this.groupsMiddleware = groupsMiddleware;
        this.groupsController = groupsController;
        this.groupsService = groupsService;
    }
    GroupsRouter.prototype.init = function (app) {
        // init the needed functions to make sure they are in the DB
        this.groupsService.initNextWordFunctions();
        app.post(groups_constants_1.ADD_GROUP_URL, this.groupsMiddleware.validateRequest.bind(this.groupsMiddleware), this.groupsMiddleware.processGroup.bind(this.groupsMiddleware), this.groupsController.insertGroup.bind(this.groupsController));
        app.get(groups_constants_1.GET_GROUPS_URL, this.groupsController.returnGroups.bind(this.groupsController));
        app.get(groups_constants_1.GET_SINGLE_GROUP_URL, this.groupsController.returnSingleGroup.bind(this.groupsController));
        app.get(groups_constants_1.GET_EXPRESSION_VALUES_URL, this.groupsMiddleware.processExpression.bind(this.groupsMiddleware), this.groupsController.returnExpressionValues.bind(this.groupsController));
        // TODO add modify group route and action
    };
    GroupsRouter = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [groups_middleware_1.GroupsMiddleware, groups_controller_1.GroupsController, server_groups_service_1.GroupsService])
    ], GroupsRouter);
    return GroupsRouter;
}());
exports.GroupsRouter = GroupsRouter;
//# sourceMappingURL=groups.router.js.map