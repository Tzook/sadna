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
var add_song_constants_1 = require('./add-song.constants');
var add_song_service_1 = require('./add-song.service');
var add_song_model_1 = require('./add-song.model');
var core_1 = require('@angular/core');
var AddSongComponent = (function () {
    function AddSongComponent(addSongService) {
        this.addSongService = addSongService;
        this.model = new add_song_model_1.AddSong();
        this.loading = false;
        this.message = "";
    }
    AddSongComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        this.message = "Adding song...";
        console.log('Submitting', this.model);
        this.addSongService.addSong(this.model)
            .subscribe(function (success) { return _this.message = "The song has been added successfully."; }, function (error) { return _this.message = "Error: " + error._body; });
    };
    AddSongComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'add-song',
            styleUrls: ['../../style/form-styles.css'],
            template: "\n        <form class=\"animated fadeIn\"\n            (ngSubmit)=\"onSubmit()\" #addSongForm=\"ngForm\">\n            <table>\n                <tr>\n                    <td><label for=\"name\">Name:</label></td>\n                    <td><input type=\"text\" placeholder=\"Name\" maxlength=\"" + add_song_constants_1.MAX_NAME_LENGTH + "\" id=\"name\" [(ngModel)]=\"model.name\" name=\"name\" autofocus required></td>\n                </tr>\n                <tr>\n                    <td><label for=\"writer\">Writer:</label></td>\n                    <td><input type=\"text\" placeholder=\"Writer\" maxlength=\"" + add_song_constants_1.MAX_NAME_LENGTH + "\" id=\"writer\" [(ngModel)]=\"model.writer\" name=\"writer\" required></td>\n                </tr>\n                <tr>\n                    <td><label for=\"composer\">Composer:</label></td>\n                    <td><input type=\"text\" placeholder=\"Composer\" maxlength=\"" + add_song_constants_1.MAX_NAME_LENGTH + "\" id=\"composer\" [(ngModel)]=\"model.composer\" name=\"composer\" required></td>\n                </tr>\n                <tr>\n                    <td><label for=\"text\">Text:</label></td>\n                    <td><textarea placeholder=\"Song text (At least " + add_song_constants_1.MIN_SONG_LENGTH + " characters)\" minlength=\"" + add_song_constants_1.MIN_SONG_LENGTH + "\" maxlength=\"" + add_song_constants_1.MAX_SONG_LENGTH + "\" rows=\"10\" id=\"text\" [(ngModel)]=\"model.text\" name=\"text\" required></textarea></td>\n                </tr>\n                <tr>\n                    <td></td>\n                    <td id=\"submit\"><button type=\"submit\" [disabled]=\"!addSongForm.form.valid || loading\">Add song</button></td>\n                </tr>\n            </table>\n\n            <div [hidden]=\"!message\">\n                {{message}}\n            </div>\n        </form>\n    ",
            viewProviders: [add_song_service_1.AddSongService]
        }), 
        __metadata('design:paramtypes', [add_song_service_1.AddSongService])
    ], AddSongComponent);
    return AddSongComponent;
}());
exports.AddSongComponent = AddSongComponent;
//# sourceMappingURL=add-song.component.js.map