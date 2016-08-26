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
const add_song_model_1 = require('./add-song.model');
const add_song_constants_1 = require('./add-song.constants');
let AddSongMiddleware = class AddSongMiddleware {
    validateRequest(req, res, next) {
        let body = req.body;
        let model = new add_song_model_1.AddSong(body.name, body.writer, body.composer, body.text);
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
            { name: "name", type: "string", min: 0, max: add_song_constants_1.MAX_NAME_LENGTH },
            { name: "writer", type: "string", min: 0, max: add_song_constants_1.MAX_NAME_LENGTH },
            { name: "composer", type: "string", min: 0, max: add_song_constants_1.MAX_NAME_LENGTH },
            { name: "text", type: "string", min: add_song_constants_1.MIN_SONG_LENGTH, max: add_song_constants_1.MAX_SONG_LENGTH },
        ];
        return this.validateParams(model, params);
    }
    validateParams(model, params) {
        for (let param of params) {
            let name = param.name, type = param.type, min = param.min, max = param.max;
            if (typeof model[name] !== type || model.name.length <= min || model.name.length > max) {
                return `Expected field '${name}' to be a ${type} between ${min} and ${max}. Instead got ${model[name]}.`;
            }
        }
        return "";
    }
};
AddSongMiddleware = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], AddSongMiddleware);
exports.AddSongMiddleware = AddSongMiddleware;
//# sourceMappingURL=add-song.middleware.js.map