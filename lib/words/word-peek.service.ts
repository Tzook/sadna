import {CompleteSong} from '../db/server-db.model';
import {Injectable} from '@angular/core';

@Injectable()
export class WordPeekService {
    private wordMap: Map<string, CompleteSong[]>;
    private wordsRows: string[];
    private houseIndexes: {};

    constructor() {
        this.wordMap = new Map<string, CompleteSong[]>();
        this.wordsRows = [];
        this.houseIndexes = {};
    }

    public set words(words: CompleteSong[]) {
        let wordsRow = [];
        let currentRow = 0;
        let currentHouse = 0;
        words = words.concat().sort((a, b) => {
            if (a.row > b.row || (a.row == b.row && a.col > b.col)) {
                return 1;
            }
            return -1;
        });

        for (let word of words) {
            if (word.row !== currentRow) {
                // push a new row
                currentRow = word.row;
                this.wordsRows.push(wordsRow.join(" "));
                wordsRow = [];
            }

            if (word.house !== currentHouse) {
                // push a new house
                currentHouse = word.house;
                this.houseIndexes[word.row] = true;
            }

            // map word to its objects
            wordsRow.push(word.word_value);
            let wordValue = word.word_value.toLowerCase();
            let currentMapvalue = this.wordMap.get(wordValue) || [];
            currentMapvalue.push(word);
            this.wordMap.set(wordValue, currentMapvalue);
        }
        this.wordsRows.push(wordsRow.join(" "));
    }

    public getWordRows(word: string): string[][] {
        word = word.toLowerCase();
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

    public getFullSong(): string {
        let fullSong = [];
        for (let i in this.wordsRows) {
            let row = this.wordsRows[i];
            if (this.houseIndexes[i]) {
                fullSong.push("");
            }
            fullSong.push(row);
        }
        return fullSong.join("\n");
    }
}