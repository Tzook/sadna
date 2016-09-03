import {GET_WORDS_URL} from './view-words.constants';
import {ViewWordsController} from './view-words.controller';
import {Injectable} from '@angular/core';

@Injectable()
export class ViewWordsRouter {

    constructor(private viewWordsController: ViewWordsController) {}

    init(app) {
        app.get(GET_WORDS_URL,
                this.viewWordsController.returnWords.bind(this.viewWordsController));
    }
}