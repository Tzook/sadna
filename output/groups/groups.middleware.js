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
var add_group_model_1 = require('./add-group.model');
var modify_group_model_1 = require('./modify-group.model');
var groups_constants_1 = require('./groups.constants');
var params_validator_1 = require('../Components/params.validator');
var words_separator_service_1 = require('../words/words-separator.service');
var GroupsMiddleware = (function () {
    function GroupsMiddleware(paramsValidators, wordsSeparatorService) {
        this.paramsValidators = paramsValidators;
        this.wordsSeparatorService = wordsSeparatorService;
    }
    GroupsMiddleware.prototype.validateRequest = function (req, res, next) {
        var body = req.body;
        var model = new add_group_model_1.AddGroup(body.name, body.words, !!body.is_expression);
        var error = this.validateModel(model);
        if (!error) {
            req.body.model = model;
            next();
        }
        else {
            next("Invalid parameter: " + error);
        }
    };
    GroupsMiddleware.prototype.validateModel = function (model) {
        var params = [
            { name: "name", type: "string", min: 0, max: groups_constants_1.MAX_GROUP_NAME_LENGTH },
            { name: "words", type: "string", min: 0, max: groups_constants_1.MAX_WORDS_LENGTH },
            { name: "is_expression", type: "boolean" },
        ];
        return this.paramsValidators.validateParams(model, params);
    };
    GroupsMiddleware.prototype.processGroup = function (req, res, next) {
        var model = req.body.model;
        req.body.words = this.wordsSeparatorService.separate(model.words);
        if (req.body.words.length == 0) {
            next("Had an empty list of words");
        }
        else {
            next();
        }
    };
    GroupsMiddleware.prototype.processExpression = function (req, res, next) {
        var words = req.params.words;
        req.body.words = this.wordsSeparatorService.separateToStrings(words);
        if (req.body.words.length == 0) {
            next("Had an empty list of words");
        }
        else {
            next();
        }
    };
    GroupsMiddleware.prototype.validateModifyRequest = function (req, res, next) {
        var model = new modify_group_model_1.ModifyGroup(req.params.id, req.body.words);
        var error = this.validateModifyModel(model);
        if (!error) {
            req.body.model = model;
            next();
        }
        else {
            next("Invalid parameter: " + error);
        }
    };
    GroupsMiddleware.prototype.validateModifyModel = function (model) {
        var params = [
            { name: "id", type: "string", min: 0, max: 9999999 },
            { name: "words", type: "string", min: 0, max: groups_constants_1.MAX_WORDS_LENGTH },
        ];
        return this.paramsValidators.validateParams(model, params);
    };
    GroupsMiddleware = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [params_validator_1.ParamsValidators, words_separator_service_1.WordsSeparatorService])
    ], GroupsMiddleware);
    return GroupsMiddleware;
}());
exports.GroupsMiddleware = GroupsMiddleware;
//# sourceMappingURL=groups.middleware.js.map