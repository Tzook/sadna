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
var song_analyze_service_1 = require('../songs/song-analyze.service');
var core_1 = require('@angular/core');
var SongStatsComponent = (function () {
    function SongStatsComponent(songAnalyzeService) {
        this.songAnalyzeService = songAnalyzeService;
        this.analyzed = false;
    }
    SongStatsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.songAnalyzeService.analyze(this.song, true)
            .then(function (wordsResult) {
            _this.houses = wordsResult.wordsInSong[wordsResult.wordsInSong.length - 1].house + 1;
            _this.words = wordsResult.words.length;
            _this.letters = wordsResult.letters;
            _this.analyzed = true;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SongStatsComponent.prototype, "song", void 0);
    SongStatsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'song-stats',
            styles: ["\n\n    "],
            template: "\n        <div *ngIf=\"analyzed\">\n            <h2>Song stats:</h2>\n            <p>{{houses}} houses, {{words}} words, {{letters}} letters.</p>\n        </div>\n    ",
            viewProviders: [song_analyze_service_1.SongAnalyzeService]
        }), 
        __metadata('design:paramtypes', [song_analyze_service_1.SongAnalyzeService])
    ], SongStatsComponent);
    return SongStatsComponent;
}());
exports.SongStatsComponent = SongStatsComponent;
//# sourceMappingURL=song-stats.component.js.map