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
const router_1 = require('@angular/router');
const view_song_service_1 = require('./view-song.service');
const unique_words_service_1 = require('../words/unique-words.service');
const word_peek_service_1 = require('../words/word-peek.service');
const word_peek_component_1 = require('../words/word-peek.component');
const song_info_component_1 = require('../songs/song-info.component');
const core_1 = require('@angular/core');
let ViewSongComponent = class ViewSongComponent {
    constructor(viewSongService, uniqueWordsService, wordPeekService, route) {
        this.viewSongService = viewSongService;
        this.uniqueWordsService = uniqueWordsService;
        this.wordPeekService = wordPeekService;
        this.route = route;
        this.words = [];
        this.uniqueWords = [];
    }
    ngOnInit() {
        let params = this.route.snapshot.params;
        this.song = params;
        this.viewSongService.getSong(params["id"])
            .subscribe(success => {
            this.words = success.json();
            this.wordPeekService.words = this.words;
            this.uniqueWords = this.uniqueWordsService.getUniqueWords(this.words, true);
        }, error => console.log(error));
    }
};
ViewSongComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'view-song',
        styles: [`
        song-info {
            text-align: center;
        }
        #words {
            margin-top: 40px;
        }
        h2 {
            margin-bottom: 10px;
        }
        word-peek:not(:last-child):after {
            content: " | ";
        }
        word-peek {
            font-size: 18px;
            line-height: 30px;
            letter-spacing: 2px;
        }
    `],
        template: `
        <song-info [song]="song"></song-info>
        <div id="words">
            <h2>Words in the song:</h2>
            <word-peek *ngFor="let word of uniqueWords" [word]="word"></word-peek>
        </div>
    `,
        directives: [song_info_component_1.SongInfoComponent, word_peek_component_1.WordPeekComponent],
        providers: [word_peek_service_1.WordPeekService],
        viewProviders: [view_song_service_1.ViewSongService, unique_words_service_1.UniqueWordsService]
    }), 
    __metadata('design:paramtypes', [view_song_service_1.ViewSongService, unique_words_service_1.UniqueWordsService, word_peek_service_1.WordPeekService, router_1.ActivatedRoute])
], ViewSongComponent);
exports.ViewSongComponent = ViewSongComponent;
//# sourceMappingURL=view-song.component.js.map