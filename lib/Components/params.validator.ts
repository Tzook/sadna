import { Injectable } from '@angular/core';

@Injectable()
export class ParamsValidators {

    public validateParams(model: any, params: any[]): string {
        for (let param of params) {
            let name = param.name, type = param.type, min = param.min, max = param.max;

            if (typeof model[name] !== type || type == 'string' && (model[name].length <= min || model[name].length > max)) {
                return `Expected field '${name}' to be a ${type}` + (type == 'string' ? ` between ${min} and ${max}. Instead got ${model[name]}.` : '.');
            }
        }
        return "";
    }
}