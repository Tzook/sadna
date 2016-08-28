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
const add_group_model_1 = require('./add-group.model');
const groups_constants_1 = require('./groups.constants');
const params_validator_1 = require('../Components/params.validator');
let GroupsMiddleware = class GroupsMiddleware {
    constructor(paramsValidators) {
        this.paramsValidators = paramsValidators;
    }
    validateRequest(req, res, next) {
        let body = req.body;
        let model = new add_group_model_1.AddGroup(body.name, body.words, !!body.is_expression);
        let error = this.validateModel(model);
        if (!error) {
            req.body.model = model;
            next();
        }
        else {
            next("Invalid parameter: " + error);
        }
    }
    validateModel(model) {
        let params = [
            { name: "name", type: "string", min: 0, max: groups_constants_1.MAX_GROUP_NAME_LENGTH },
            { name: "words", type: "string", min: 0, max: groups_constants_1.MAX_WORDS_LENGTH },
            { name: "is_expression", type: "boolean" },
        ];
        return this.paramsValidators.validateParams(model, params);
    }
};
GroupsMiddleware = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [params_validator_1.ParamsValidators])
], GroupsMiddleware);
exports.GroupsMiddleware = GroupsMiddleware;
//# sourceMappingURL=groups.middleware.js.map