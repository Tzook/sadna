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
const word_peek_service_1 = require('../words/word-peek.service');
const core_1 = require('@angular/core');
let FullSongComponent = class FullSongComponent {
    constructor(wordPeekService) {
        this.wordPeekService = wordPeekService;
    }
    ngOnInit() {
    }
    viewFullSong() {
        this.song = this.wordPeekService.getFullSong();
    }
};
FullSongComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'full-song',
        styles: [`
        section {
            text-align: center;
            font-size: 18px;
        }
        div {
            white-space: pre-line;
        }
    `],
        template: `
        <section>
            <button [hidden]="song" (click)="viewFullSong()">View full song</button>
            <div *ngIf="song">
                {{song}}
            </div>
        </section>
    `
    }), 
    __metadata('design:paramtypes', [word_peek_service_1.WordPeekService])
], FullSongComponent);
exports.FullSongComponent = FullSongComponent;
//# sourceMappingURL=full-song.component.js.map