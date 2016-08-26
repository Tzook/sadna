"use strict";
const songs_list_controller_1 = require('../songs-list/songs-list.controller');
const songs_list_router_1 = require('../songs-list/songs-list.router');
const add_song_middleware_1 = require('../add-song/add-song.middleware');
const add_song_router_1 = require('../add-song/add-song.router');
const server_db_1 = require('./server-db');
const server_router_1 = require('./server-router');
const server_main_1 = require('./server-main');
const server_songs_router_1 = require('../routers/server-songs.router');
const server_songs_service_1 = require('../songs/server-songs.service');
const server_groups_service_1 = require('../groups/server-groups.service');
const core_1 = require('@angular/core');
exports.serviceContainer = core_1.ReflectiveInjector.resolveAndCreate([
    server_db_1.DbService,
    server_router_1.ServerRouter,
    server_songs_router_1.SongsRouter,
    server_groups_service_1.GroupsService,
    add_song_router_1.AddSongRouter,
    add_song_middleware_1.AddSongMiddleware,
    songs_list_router_1.SongsListRouter,
    songs_list_controller_1.SongsListController,
    server_songs_service_1.SongsService,
    server_main_1.ServerMain,
]);
//# sourceMappingURL=service-container.js.map