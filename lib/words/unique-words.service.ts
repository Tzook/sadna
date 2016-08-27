import {CompleteSong} from '../db/server-db.model';
import {Injectable} from '@angular/core';

@Injectable()
export class UniqueWordsService {

    constructor() { }

    public getUniqueWords(words: CompleteSong[], sorted: boolean): string[] {
        let resultWords = [];
        let seenWords = new Set<string>();

        for (let word of words) {
            let wordValue = word.word_value.toLowerCase();
            if (!word.is_punctuation && !seenWords.has(wordValue)) {
                seenWords.add(wordValue);
                resultWords.push(wordValue);
            }
        }

        return sorted ? this.sortWords(resultWords) : resultWords;
    }

    private sortWords(words: string[]): string[] {
        return words.sort((a, b) => {
            return a > b ? 1 : -1;
        });
    }
}