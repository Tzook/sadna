import {CompleteSong} from '../db/server-db.model';
import {Injectable} from '@angular/core';

@Injectable()
export class WordPeekService {
    private wordMap: Map<string, CompleteSong[]>;
    private wordsRows: string[];

    constructor() {
        this.wordMap = new Map();
        this.wordsRows = [];
    }

    public set words(words: CompleteSong[]) {
        let wordsRow = [];
        let currentRow = 0;
        for (let word of words) {
            if (word.row !== currentRow) {
                currentRow++;
                this.wordsRows.push(wordsRow.join(" "));
                wordsRow = [];
            }
            wordsRow.push(word.word_value);
            let wordValue = word.word_value.toLowerCase();
            let currentMapvalue = this.wordMap.get(wordValue) || [];
            currentMapvalue.push(word);
            this.wordMap.set(wordValue, currentMapvalue);
        }
        this.wordsRows.push(wordsRow.join(" "));
    }

    public getWordRows(word: string): string[][] {
        let strings = [];
        let handledRows = new Set<number>();
        let wordsArray = this.wordMap.get(word);
        for (let word of wordsArray) {
            if (!handledRows.has(word.row)) {
                handledRows.add(word.row);
                let resultRows = [];
                for (let j of [-1, 0, 1]) {
                    if (this.wordsRows[word.row + j]) {
                        resultRows.push(this.wordsRows[word.row + j]);
                    }
                }
                strings.push(resultRows);
            }

        }
        return strings;
    }
}