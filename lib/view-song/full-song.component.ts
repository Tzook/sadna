import {PARAM_WORDS_LIST, PARAM_IS_EXPRESSION} from '../view-words/view-words.constants';
import {ROUTE_WORDS} from '../navigation/routes.constants';
import {Router} from '@angular/router';
import {WordPeekService} from '../words/word-peek.service';
import {Component} from '@angular/core';

@Component({
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
        aside {
            margin-top: 5px;
            font-size: 15px;
        }
    `],
    template: `
        <section>
            <button [hidden]="song" (click)="viewFullSong()">View full song</button>
            <div *ngIf="song">
                <div>{{song}}</div>
                <button (click)="showHighlighted()">Show expression occurences*</button>
                <aside>* Select a few words with the cursor, and click the button to view the expression occurences</aside>
                <song-stats [song]="song"></song-stats>
            </div>
        </section>
    `
})
export class FullSongComponent {
    private song: string;

    constructor(private router: Router,
                private wordPeekService: WordPeekService) { }

    private viewFullSong() {
        this.song = this.wordPeekService.getFullSong();
    }

    private showHighlighted() {
        let highlightedText = window.getSelection().toString().toLowerCase();
        if (highlightedText) {
            let params = {};
            params[PARAM_WORDS_LIST] = highlightedText;
            params[PARAM_IS_EXPRESSION] = true;
            this.router.navigate([ROUTE_WORDS, params]);
        }
    }
}