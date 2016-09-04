import { Injectable } from '@angular/core';

const LETTERS = /[\w'-]+/g;

@Injectable()
export class WordsSeparatorService {

    public separate(words: string): string[] {
        return words.match(LETTERS);
    }
}