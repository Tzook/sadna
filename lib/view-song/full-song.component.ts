import {WordPeekService} from '../words/word-peek.service';
import {Component, OnInit} from '@angular/core';

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
    `],
    template: `
        <section>
            <button [hidden]="song" (click)="viewFullSong()">View full song</button>
            <div *ngIf="song">
                {{song}}
            </div>
        </section>
    `
})
export class FullSongComponent implements OnInit {
    private song: string;

    constructor(private wordPeekService: WordPeekService) { }

    ngOnInit() {
    }

    private viewFullSong() {
        this.song = this.wordPeekService.getFullSong();
    }
}