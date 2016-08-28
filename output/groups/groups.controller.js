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
const core_1 = require('@angular/core');
const server_groups_service_1 = require("./server-groups.service");
let GroupsController = class GroupsController {
    constructor(groupsService) {
        this.groupsService = groupsService;
    }
    processGroup(req, res, next) {
        let model = req.body.model;
        let wordsStrings = model.words.match(/[\w'-]+/g);
        req.body.words = [];
        let i = 0;
        for (let word of wordsStrings) {
            req.body.words[i++] = {
                value: word
            };
        }
        next();
    }
    insertGroup(req, res, next) {
        this.groupsService.loadGroup(req.body.model, req.body.words)
            .then(() => res.send())
            .catch(e => next(e));
    }
    returnGroups(req, res, next) {
        this.groupsService.selectGroups()
            .then((result) => {
            res.send(result.rows);
        })
            .catch(e => {
            next("Error while fetching groups list" + e);
        });
    }
};
GroupsController = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [server_groups_service_1.GroupsService])
], GroupsController);
exports.GroupsController = GroupsController;
//# sourceMappingURL=groups.controller.js.map