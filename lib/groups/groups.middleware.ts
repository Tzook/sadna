import { Injectable } from '@angular/core';
import {AddGroup} from './add-group.model';
import {MAX_GROUP_NAME_LENGTH, MAX_WORDS_LENGTH} from './groups.constants';
import {ParamsValidators} from '../Components/params.validator';
import * as e from "express";

@Injectable()
export class GroupsMiddleware {

  	constructor(private paramsValidators: ParamsValidators) {}

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
        ]
        return this.paramsValidators.validateParams(model, params);
    }
}