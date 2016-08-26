import {SongsListController} from '../songs-list/songs-list.controller';
import {SongsListRouter} from '../songs-list/songs-list.router';
import {AddSongMiddleware} from '../add-song/add-song.middleware';
import {AddSongRouter} from '../add-song/add-song.router';
import {DbService} from './server-db';
import {ServerRouter} from './server-router';
import {ServerMain} from './server-main';
import {SongsRouter} from '../routers/server-songs.router';
import {SongsService} from '../songs/server-songs.service';
import {GroupsService} from '../groups/server-groups.service';
import {WordsService} from '../words/server-words.service';
import {ReflectiveInjector} from '@angular/core';

export const serviceContainer = ReflectiveInjector.resolveAndCreate([
    DbService,
    ServerRouter,
    SongsRouter,
    GroupsService,
    WordsService,
    AddSongRouter,
    AddSongMiddleware,
    SongsListRouter,
    SongsListController,
    SongsService,
    ServerMain,
]);