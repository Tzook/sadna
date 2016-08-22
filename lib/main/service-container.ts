import {DbService} from './server-db';
import {Router} from './server-router';
import {ServerMain} from './server-main';
import {SongsRouter} from '../routers/server-songs.router';
import {SongsService} from '../songs/server-songs.service';
import { ReflectiveInjector } from '@angular/core';

export const serviceContainer = ReflectiveInjector.resolveAndCreate([
    DbService,
    Router,
    SongsRouter,
    SongsService,
    ServerMain,

]);