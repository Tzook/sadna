import {ActivatedRoute} from '@angular/router';
import {PARAM_WORDS_LIST} from './view-words.constants';
import {ViewWordsService} from './view-words.service';
import {WordsSeparatorService} from '../words/words-separator.service';
import {SongsPeekService} from '../songs/songs-peek.service';
import {ViewSongService} from '../view-song/view-song.service';
import {Component, OnInit} from '@angular/core';
import {Word} from '../db/server-db.model';

@Component({
    moduleId: module.id,
    selector: 'words',
    styles: [`
    `],
    template: `
        <h2>Words</h2>
        <div *ngIf="wordsList">
            <songs-peek *ngFor="let word of wordsList" [word]="word.value"></songs-peek>
        </div>
    `,
    providers: [SongsPeekService, ViewSongService], // available for children
    viewProviders: [ViewWordsService, WordsSeparatorService]
})
export class WordsComponent implements OnInit {
    private wordsList: Word[];

    constructor(private route: ActivatedRoute,
                private wordsSeparatorService: WordsSeparatorService,
                private viewWordsService: ViewWordsService) { }

    ngOnInit() {
        let params = this.route.snapshot.queryParams;
        if (params[PARAM_WORDS_LIST]) {
            this.wordsList = this.wordsSeparatorService.separate(params[PARAM_WORDS_LIST]);
        } else {
             this.viewWordsService.getWords()
                .subscribe(
                    success => this.wordsList = success.json(),
                    error => console.log(error)
                );
        }
    }
}