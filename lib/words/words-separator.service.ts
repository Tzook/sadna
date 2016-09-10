import {LETTERS_REGEX} from './punctuation.constants';
import {Word} from '../db/server-db.model';
import {Injectable} from '@angular/core';

@Injectable()
export class WordsSeparatorService {

    public separate(words: string): Word[] {
        let wordsStrings = this.separateToStrings(words);
        let i = 0;
        let result: Word[] = [];
        for (let word of wordsStrings) {
            result[i++] = {
                value: word.toLowerCase()
            };
        }
        return result;
    }

    public separateToStrings(words: string): string[] {
        return words.match(LETTERS_REGEX);
    }
}