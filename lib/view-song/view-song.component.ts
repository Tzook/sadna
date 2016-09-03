import {CompleteSong} from '../db/server-db.model';
import {ActivatedRoute} from '@angular/router';
import {ViewSongService} from './view-song.service';
import {UniqueWordsService} from '../words/unique-words.service';
import {WordPeekService} from '../words/word-peek.service';
import {WordPeekComponent} from '../words/word-peek.component';
import {Component, OnInit} from '@angular/core';
import {Song} from '../db/server-db.model';

@Component({
    moduleId: module.id,
    selector: 'view-song',
    styles: [`
        :host {
            display: block;
            margin-bottom: 50px;
        }
        song-info {
            text-align: center;
        }
        #words {
            margin: 40px 0 20px;
        }
        h2 {
            margin-bottom: 10px;
        }
    `],
    template: `
        <song-info [song]="song"></song-info>
        <div id="words">
            <h2>Words in the song:</h2>
            <word-peek *ngFor="let word of uniqueWords" [word]="word"></word-peek>
        </div>
        <word-by-index *ngIf="words.length" [words]="words"></word-by-index>
        <full-song *ngIf="uniqueWords.length"></full-song>
    `,
    providers: [WordPeekService], // available for children components too
    viewProviders: [ViewSongService, UniqueWordsService]
})
export class ViewSongComponent implements OnInit {
    private uniqueWords: string[];
    private words: CompleteSong[];
    private song: Song;

    constructor(private viewSongService: ViewSongService,
                private uniqueWordsService: UniqueWordsService,
                private wordPeekService: WordPeekService,
                private route: ActivatedRoute) {
        this.uniqueWords = [];
        this.words = [];
    }

    ngOnInit() {
        let params = this.route.snapshot.params;
        this.song = <Song>params;
        this.viewSongService.getSong(params["id"])
                .subscribe(
                    success => {
                        this.words = success.json();
                        this.wordPeekService.words = this.words;
                        this.uniqueWords = this.uniqueWordsService.getUniqueWords(this.words, true);
                    },
                    error => console.log(error)
                );
    }
}