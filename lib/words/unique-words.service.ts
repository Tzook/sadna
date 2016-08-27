import {CompleteSong} from '../db/server-db.model';
import {Injectable} from '@angular/core';

@Injectable()
export class UniqueWordsService {

    constructor() { }

    public getUniqueWords(words: CompleteSong[]): CompleteSong[] {
        let resultWords = [];
        let seenWords = new Set<string>();

        for (let word of words) {
            let wordValue = word.word_value.toLowerCase();
            if (!word.is_punctuation && !seenWords.has(wordValue)) {
                seenWords.add(wordValue);
                resultWords.push(word);
            }
        }

        return resultWords;
    }
}