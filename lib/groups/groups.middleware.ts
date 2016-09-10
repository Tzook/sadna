import { Injectable } from '@angular/core';
import {AddGroup} from './add-group.model';
import {ModifyGroup} from './modify-group.model';
import {MAX_GROUP_NAME_LENGTH, MAX_WORDS_LENGTH} from './groups.constants';
import {ParamsValidators} from '../Components/params.validator';
import {WordsSeparatorService} from '../words/words-separator.service';
import * as e from "express";

@Injectable()
export class GroupsMiddleware {

  	constructor(private paramsValidators: ParamsValidators,
                private wordsSeparatorService: WordsSeparatorService) {}

    public validateRequest(req: e.Request, res: e.Response, next: Function) {
        let body = req.body;
        let model = new AddGroup(body.name, body.words, !!body.is_expression);
        let error = this.validateModel(model)
        if (!error) {
            req.body.model = model;
            next();
        }  else {
            next("Invalid parameter: " + error);
        }
    }

    private validateModel(model: AddGroup): string {
        let params = [
            { name: "name", type: "string", min: 0, max: MAX_GROUP_NAME_LENGTH },
            { name: "words", type: "string", min: 0, max: MAX_WORDS_LENGTH },
            { name: "is_expression", type: "boolean" },
        ];
        return this.paramsValidators.validateParams(model, params);
    }

    public processGroup(req: e.Request, res: e.Response, next: Function) {
        let model: AddGroup|ModifyGroup = req.body.model;
        req.body.words = this.wordsSeparatorService.separate(model.words);
        if (req.body.words.length == 0) {
            next("Had an empty list of words");
        } else {
            next();
        }
    }

    public processExpression(req: e.Request, res: e.Response, next: Function) {
        let words: string = req.params.words;
        req.body.words = this.wordsSeparatorService.separateToStrings(words);
        if (req.body.words.length == 0) {
            next("Had an empty list of words");
        } else {
            next();
        }
    }

    public validateModifyRequest(req: e.Request, res: e.Response, next: Function) {
        let model = new ModifyGroup(req.params.id, req.body.words);
        let error = this.validateModifyModel(model);
        if (!error) {
            req.body.model = model;
            next();
        }  else {
            next("Invalid parameter: " + error);
        }
    }

    private validateModifyModel(model: ModifyGroup): string {
        let params = [
            { name: "id", type: "string", min: 0, max: 9999999 },
            { name: "words", type: "string", min: 0, max: MAX_WORDS_LENGTH },
        ];
        return this.paramsValidators.validateParams(model, params);
    }
}