import {HOUSE_SPLIT_REGEX, SENTENCE_SPLIT_REGEX, WORD_SPLIT_REGEX, PUNCTUATIONS_REGEX} from '../words/punctuation.constants';
import {CompleteWordInSong, Word, WordInSong} from '../db/server-db.model';
import {Injectable} from '@angular/core';

@Injectable()
export class SongAnalyzeService {

    constructor() {}

    public analyze(text: string, skipPunctuation?: boolean): Promise<CompleteWordInSong> {
        return new Promise(resolve => {
            let wordsResult: CompleteWordInSong = {
                words: [],
                wordsInSong: [],
                letters: 0,
            };
            let row = 0;
            let houseNum = 0;
            let houses = text.split(HOUSE_SPLIT_REGEX);

            for (let house of houses) {
                let sentenceNum = 0;
                let sentences = house.split(SENTENCE_SPLIT_REGEX);

                for (let sentence of sentences) {
                    let col = 0;
                    let wordNum = 0;
                    let words = sentence.split(WORD_SPLIT_REGEX);

                    for (let word of words) {
                        let wordParts = word.split(PUNCTUATIONS_REGEX);

                        for (let wordPart of wordParts) {
                            if (!wordPart.length) {
                                continue;
                            }

                            let isPunctuation = !!wordPart.match(PUNCTUATIONS_REGEX);
                            if (isPunctuation && skipPunctuation) {
                                continue;
                            }

                            let wordObj: Word = {
                                value: wordPart,
                                is_punctuation: isPunctuation
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
                            wordsResult.letters += wordPart.length;

                            wordNum++;
                            col++;
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