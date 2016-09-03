import {ViewWordsService} from './view-words.service';
import {Component, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'words',
    styles: [`
        span {
            line-height: 25px;
            letter-spacing: 1.5px;
        }
        span:not(:last-child):after {
            content: " | ";
        }
    `],
    template: `
        <h2>Words</h2>
        <div *ngIf="wordsList">
            <span *ngFor="let word of wordsList">{{word.value}}</span>
        </div>
    `,
    viewProviders: [ViewWordsService]
})
export class WordsComponent implements OnInit {
    private wordsList: any[];

    constructor(private viewWordsService: ViewWordsService) { }

    ngOnInit() {
         this.viewWordsService.getWords()
            .subscribe(
                success => this.wordsList = success.json(),
                error => console.log(error)
            );
    }
}