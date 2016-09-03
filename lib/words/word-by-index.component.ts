import {CompleteSong} from '../db/server-db.model';
import {WordsIndexService} from './words-index.service';
import {Component, OnInit, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'word-by-index',
    styles: [`
        h2,
        h3,
        div {
            margin-bottom: 10px;
        }
    `],
    template: `
        <h2>Search by index:</h2>
        <h3 *ngIf="foundWord">Found word: <word-peek [word]="foundWord"></word-peek></h3>
        <h3 *ngIf="foundWord === ''">No word found in the given index</h3>
        <div>
            <label for="row">Row: </label>
            <input type="number" max="9999" min="1" id="row" #row (input)="searchByRowCol(row.value, col.value)">
            <label for="col">Col: </label>
            <input type="number" max="9999" min="1" id="col" #col (input)="searchByRowCol(row.value, col.value)">
        </div>
        <div>
            <label for="house">House: </label>
            <input type="number" max="9999" min="1" id="house" #house (input)="searchByHouseSentenceWord(house.value, sentence.value, word.value)">
            <label for="sentence">Sentence: </label>
            <input type="number" max="9999" min="1" id="sentence" #sentence (input)="searchByHouseSentenceWord(house.value, sentence.value, word.value)">
            <label for="word">Word: </label>
            <input type="number" max="9999" min="1" id="word" #word (input)="searchByHouseSentenceWord(house.value, sentence.value, word.value)">
        </div>
    `,
    viewProviders: [WordsIndexService]
})
export class WordByIndexComponent implements OnInit {
    @Input() words: CompleteSong[];

    private foundWord: string;

    constructor(private wordsIndexService: WordsIndexService) {}

    ngOnInit() {
        this.wordsIndexService.words = this.words;
    }

    private searchByRowCol(row: number, col: number) {
        if (row && col) {
            this.foundWord = this.wordsIndexService.getWordByRowCol(row - 1, col - 1);
        }
    }

    private searchByHouseSentenceWord(house: number, sentence: number, word: number) {
        if (house && sentence && word) {
            this.foundWord = this.wordsIndexService.getWordByHouseSentenceWord(house - 1, sentence - 1, word - 1);
        }
    }
}