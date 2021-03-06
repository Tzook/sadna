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
var server_groups_service_1 = require("./server-groups.service");
var GroupsController = (function () {
    function GroupsController(groupsService) {
        this.groupsService = groupsService;
    }
    GroupsController.prototype.insertGroup = function (req, res, next) {
        this.groupsService.loadGroup(req.body.model, req.body.words)
            .then(function () { return res.send(); })
            .catch(function (e) { return next(e); });
    };
    GroupsController.prototype.updateGroup = function (req, res, next) {
        this.groupsService.updateGroup(req.body.model.id, req.body.words)
            .then(function () { return res.send(); })
            .catch(function (e) { return next(e); });
    };
    GroupsController.prototype.returnGroups = function (req, res, next) {
        this.groupsService.selectGroups()
            .then(function (result) {
            res.send(result.rows);
        })
            .catch(function (e) {
            next("Error while fetching groups list" + e);
        });
    };
    GroupsController.prototype.returnSingleGroup = function (req, res, next) {
        this.groupsService.selectGroup(req.params.id)
            .then(function (result) {
            res.send(result.rows);
        })
            .catch(function (e) {
            next("Error while fetching groups list" + e);
        });
    };
    GroupsController.prototype.returnExpressionValues = function (req, res, next) {
        this.groupsService.getWordGroupPossibilities(req.body.words)
            .then(function (result) {
            console.log(result.rows);
            res.send(result.rows);
        })
            .catch(function (e) {
            console.log("Error while fetching expression possibilities", e);
        });
    };
    GroupsController = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_groups_service_1.GroupsService])
    ], GroupsController);
    return GroupsController;
}());
exports.GroupsController = GroupsController;
//# sourceMappingURL=groups.controller.js.map