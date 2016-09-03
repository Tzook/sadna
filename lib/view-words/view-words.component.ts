import {ViewWordsService} from './view-words.service';
import {Component, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'words',
    styles: [`

    `],
    template: `
        Loading all words...
        {{wordsList | json}}
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