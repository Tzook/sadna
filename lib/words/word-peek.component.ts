import {WordPeekService} from './word-peek.service';
import {Component, OnInit, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'word-peek',
    styles: [`
        :host {
            font-size: 18px;
            line-height: 30px;
            letter-spacing: 2px;
        }
        :host:not(:last-child):after {
            content: " | ";
        }
        .rows:not(:last-child) {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 2px dotted;
        }
    `],
    template: `
        <callout-wrap (calloutShown)="showRows()">
            <pre-callout>{{word}}</pre-callout>
            <callout>
                <div class="rows">
                    Appearances of "<b>{{word}}</b>" ({{word.length}} letters):
                </div>
                <div class="rows" *ngFor="let wordRow of wordRows">
                    <div *ngFor="let row of wordRow">
                        {{row}}
                    </div>
                </div>
            </callout>
        </callout-wrap>
    `,
})
export class WordPeekComponent implements OnInit {
    @Input() word: string;
    private wordRows: string[][];

    constructor(private wordPeekService: WordPeekService) {}

    ngOnInit() {}

    private showRows() {
        this.wordRows = this.wordRows || this.wordPeekService.getWordRows(this.word);
    }
}