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
let ParamsValidators = class ParamsValidators {
    validateParams(model, params) {
        for (let param of params) {
            let name = param.name, type = param.type, min = param.min, max = param.max;
            if (typeof model[name] !== type || type == 'string' && (model[name].length <= min || model[name].length > max)) {
                return `Expected field '${name}' to be a ${type}` + (type == 'string' ? ` between ${min} and ${max}. Instead got ${model[name]}.` : '.');
            }
        }
        return "";
    }
};
ParamsValidators = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], ParamsValidators);
exports.ParamsValidators = ParamsValidators;
//# sourceMappingURL=params.validator.js.map