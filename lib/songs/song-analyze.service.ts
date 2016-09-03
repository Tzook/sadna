import {CompleteWordInSong, Word, WordInSong} from '../db/server-db.model';
import {Injectable} from '@angular/core';

const PUNCTUATIONS = /([…,."?!()])/g;

@Injectable()
export class SongAnalyzeService {

    constructor() {}

    public analyze(text: string): Promise<CompleteWordInSong> {
        return new Promise(resolve => {
            let wordsResult: CompleteWordInSong = {
                words: [],
                wordsInSong: [],
            };
            let row = 0;
            let houseNum = 0;
            let houses = text.split(/\n{2,}/g);

            for (let house of houses) {
                let sentenceNum = 0;
                let sentences = house.split(/\n/g);

                for (let sentence of sentences) {
                    let col = 0;
                    let wordNum = 0;
                    let words = sentence.split(/\s/g);

                    for (let word of words) {
                        let wordParts = word.split(PUNCTUATIONS);

                        for (let wordPart of wordParts) {

                            if (wordPart.length) {
                                let wordObj: Word = {
                                    value: wordPart,
                                    is_punctuation: PUNCTUATIONS.test(wordPart)
                                };
                                let wordInSong: WordInSong = {
                                    col,
                                    row,
                                    house: houseNum,
                                    sentence: sentenceNum,
                                    word_num: wordNum,
                                }
                                wordsResult.words.push(wordObj);
                                wordsResult.wordsInSong.push(wordInSong);

                                wordNum++;
                                col++;
                            }
                        }
                    }
                    row++;
                    sentenceNum++;
                }
                houseNum++;
            }

            resolve(wordsResult);
        });
    }
}