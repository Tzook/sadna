import {Word} from '../db/server-db.model';
import {Injectable} from '@angular/core';

const LETTERS = /[\w'-]+/g;

@Injectable()
export class WordsSeparatorService {

    public separate(words: string): Word[] {
        let wordsStrings = words.match(LETTERS);
        let i = 0;
        let result: Word[] = [];
        for (let word of wordsStrings) {
            result[i++] = {
                value: word
            };
        }
        return result;
    }
}