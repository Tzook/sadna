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
var view_words_constants_1 = require('./view-words.constants');
var view_words_controller_1 = require('./view-words.controller');
var core_1 = require('@angular/core');
var ViewWordsRouter = (function () {
    function ViewWordsRouter(viewWordsController) {
        this.viewWordsController = viewWordsController;
    }
    ViewWordsRouter.prototype.init = function (app) {
        app.get(view_words_constants_1.GET_WORDS_URL, this.viewWordsController.returnWords.bind(this.viewWordsController));
    };
    ViewWordsRouter = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [view_words_controller_1.ViewWordsController])
    ], ViewWordsRouter);
    return ViewWordsRouter;
}());
exports.ViewWordsRouter = ViewWordsRouter;
//# sourceMappingURL=view-words.router.js.map