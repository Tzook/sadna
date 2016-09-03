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
        .word {
            padding-bottom: 5px;
        }
        .rows:not(:last-child) {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 2px dotted;
        }
    `],
    template: `
        <span (mouseenter)="showRows()" (mouseleave)="hideRows()">
            <span class="word">{{word}}</span>
            <callout *ngIf="showCallout">
                <div class="rows" *ngFor="let wordRow of wordRows">
                    <div *ngFor="let row of wordRow">
                        {{row}}
                    </div>
                </div>
            </callout>
        </span>
    `,
})
export class WordPeekComponent implements OnInit {
    @Input() word: string;
    private wordRows: string[][];
    private showCallout: boolean;

    constructor(private wordPeekService: WordPeekService) {
        this.showCallout = false;
    }

    ngOnInit() {}

    private showRows() {
        this.wordRows = this.wordRows || this.wordPeekService.getWordRows(this.word);
        this.showCallout = true;
    }

    private hideRows() {
        this.showCallout = false;
    }
}