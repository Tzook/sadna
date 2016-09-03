import {ViewWordsController} from '../view-words/view-words.controller';
import {ViewWordsRouter} from '../view-words/view-words.router';
import {GroupsRouter} from '../groups/groups.router';
import {GroupsMiddleware} from '../groups/groups.middleware';
import {GroupsController} from '../groups/groups.controller';
import {ParamsValidators} from '../Components/params.validator';
import {ViewSongRouter} from '../view-song/view-song.router';
import {ViewSongController} from '../view-song/view-song.controller';
import {AddSongController} from '../add-song/add-song.controller';
import {SongAnalyzeService} from '../songs/song-analyze.service';
import {SongsListController} from '../songs-list/songs-list.controller';
import {SongsListRouter} from '../songs-list/songs-list.router';
import {AddSongMiddleware} from '../add-song/add-song.middleware';
import {AddSongRouter} from '../add-song/add-song.router';
import {DbService} from '../db/server-db';
import {ServerRouter} from '../navigation/server-router';
import {ServerMain} from './server-main';
import {SongsService} from '../songs/server-songs.service';
import {GroupsService} from '../groups/server-groups.service';
import {WordsService} from '../words/server-words.service';
import {XmlRouter} from '../db/backup/xml.router';
import {XmlController} from '../db/backup/xml.controller';
import {XmlService} from '../db/backup/xml.service';
import {ReflectiveInjector} from '@angular/core';

export const serviceContainer = ReflectiveInjector.resolveAndCreate([
    DbService,
    ParamsValidators,
    ServerRouter,
    GroupsService,
    WordsService,
    AddSongRouter,
    AddSongMiddleware,
    AddSongController,
    SongsListRouter,
    SongsListController,
    ViewWordsController,
    ViewWordsRouter,
    GroupsRouter,
    GroupsMiddleware,
    GroupsController,
    ViewSongRouter,
    ViewSongController,
    SongsService,
    XmlRouter,
    XmlController,
    XmlService,
    SongAnalyzeService,
    ServerMain,
]);