import {ActivatedRoute} from '@angular/router';
import {PARAM_WORDS_LIST, PARAM_IS_EXPRESSION} from './view-words.constants';
import {ViewWordsService} from './view-words.service';
import {WordsSeparatorService} from '../words/words-separator.service';
import {SongsPeekService} from '../songs/songs-peek.service';
import {ViewSongService} from '../view-song/view-song.service';
import {ClientGroupsService} from '../groups/groups.service';
import {Component, OnInit} from '@angular/core';
import {Word, Song} from '../db/server-db.model';

@Component({
    moduleId: module.id,
    selector: 'words',
    styles: [`
        #title {
            margin: 20px 0;
        }
    `],
    template: `
        <h2>Words</h2>
        <div *ngIf="wordsList">
            <songs-peek *ngFor="let word of wordsList" [word]="word.value"></songs-peek>
        </div>
        <div *ngIf="songs.length">
            <h2 id="title">The expression appears in the following songs:</h2>
            <songs-list [list]="songs"></songs-list>
        </div>
        <span *ngIf="message">{{message}}</span>
    `,
    providers: [SongsPeekService, ViewSongService], // available for children
    viewProviders: [ViewWordsService, WordsSeparatorService, ClientGroupsService]
})
export class WordsComponent implements OnInit {
    private wordsList: Word[];
    private songs: Song[];
    private message: string;

    constructor(private route: ActivatedRoute,
                private wordsSeparatorService: WordsSeparatorService,
                private viewWordsService: ViewWordsService,
                private clientGroupsService: ClientGroupsService) {
                    this.songs = [];
                }

    ngOnInit() {
        let params = this.route.snapshot.params;
        if (params[PARAM_WORDS_LIST]) {
            this.wordsList = this.wordsSeparatorService.separate(params[PARAM_WORDS_LIST]);
            if (params[PARAM_IS_EXPRESSION] === "true") {
                this.clientGroupsService.getExpressionPossibilities(params[PARAM_WORDS_LIST])
                    .subscribe(
                        success => {
                            this.songs = success.json();
                            if (!this.songs || this.songs.length == 0) {
                                this.message = "No results found for the expression."
                            }
                        },
                        error => console.log(error)
                    );
            }
        } else {
             this.viewWordsService.getWords()
                .subscribe(
                    success => this.wordsList = success.json(),
                    error => console.log(error)
                );
        }
    }
}