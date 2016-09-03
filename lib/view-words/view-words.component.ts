import {ViewWordsService} from './view-words.service';
import {SongsPeekService} from '../songs/songs-peek.service';
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
    providers: [SongsPeekService], // available for children
    viewProviders: [ViewWordsService]
})
export class WordsComponent implements OnInit {
    private wordsList: Word[];

    constructor(private viewWordsService: ViewWordsService) { }

    ngOnInit() {
         this.viewWordsService.getWords()
            .subscribe(
                success => this.wordsList = success.json(),
                error => console.log(error)
            );
    }
}