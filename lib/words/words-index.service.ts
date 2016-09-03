import {CompleteSong} from '../db/server-db.model';
import {Injectable} from '@angular/core';

@Injectable()
export class WordsIndexService {
    private songWords: CompleteSong[];
    private rowColMatrix: string[][];
    private houseSentenceWordMatrix: string[][][];

    constructor() {
        this.rowColMatrix = [];
        this.houseSentenceWordMatrix = [];
    }

    public set words(words: CompleteSong[]) {
        this.songWords = words;
    }

    public getWordByRowCol(row: number, col: number): string {
        if (!this.rowColMatrix.length) {
            this.prepareRowColMatrix();
        }
        return (this.rowColMatrix[row] && this.rowColMatrix[row][col]) || "";
    }

    private prepareRowColMatrix() {
        for (let word of this.songWords) {
            this.rowColMatrix[word.row] = this.rowColMatrix[word.row] || [];
            this.rowColMatrix[word.row][word.col] = word.word_value;
        }
    }

    public getWordByHouseSentenceWord(house: number, sentence: number, word: number): string {
        if (!this.houseSentenceWordMatrix.length) {
            this.prepareHouseSentenceWordMatrix();
        }
        return (this.houseSentenceWordMatrix[house] && this.houseSentenceWordMatrix[house][sentence] && this.houseSentenceWordMatrix[house][sentence][word]) || "";
    }

    private prepareHouseSentenceWordMatrix() {
        for (let word of this.songWords) {
            this.houseSentenceWordMatrix[word.house] = this.houseSentenceWordMatrix[word.house] || [];
            this.houseSentenceWordMatrix[word.house][word.sentence] = this.houseSentenceWordMatrix[word.house][word.sentence] || [];
            this.houseSentenceWordMatrix[word.house][word.sentence][word.word_num] = word.word_value;
        }
    }
}