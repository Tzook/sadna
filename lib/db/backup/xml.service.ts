import {Injectable} from '@angular/core';
import {SongsService} from '../../songs/server-songs.service';
import {GroupsService} from '../../groups/server-groups.service';
import {WordsService} from '../../words/server-words.service';
import * as xml2js from 'xml2js';

@Injectable()
export class XmlService {

    constructor(private _songsService: SongsService,
                private _groupsService: GroupsService,
                private _wordsService: WordsService) {}
    
    
}