"use strict";
const groups_router_1 = require('../groups/groups.router');
const groups_middleware_1 = require('../groups/groups.middleware');
const groups_controller_1 = require('../groups/groups.controller');
const params_validator_1 = require('../Components/params.validator');
const view_song_router_1 = require('../view-song/view-song.router');
const view_song_controller_1 = require('../view-song/view-song.controller');
const add_song_controller_1 = require('../add-song/add-song.controller');
const song_analyze_service_1 = require('../songs/song-analyze.service');
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
const server_words_service_1 = require('../words/server-words.service');
const xml_router_1 = require('../db/backup/xml.router');
const xml_controller_1 = require('../db/backup/xml.controller');
const xml_service_1 = require('../db/backup/xml.service');
const core_1 = require('@angular/core');
exports.serviceContainer = core_1.ReflectiveInjector.resolveAndCreate([
    server_db_1.DbService,
    params_validator_1.ParamsValidators,
    server_router_1.ServerRouter,
    server_songs_router_1.SongsRouter,
    server_groups_service_1.GroupsService,
    server_words_service_1.WordsService,
    add_song_router_1.AddSongRouter,
    add_song_middleware_1.AddSongMiddleware,
    add_song_controller_1.AddSongController,
    songs_list_router_1.SongsListRouter,
    songs_list_controller_1.SongsListController,
    groups_router_1.GroupsRouter,
    groups_middleware_1.GroupsMiddleware,
    groups_controller_1.GroupsController,
    view_song_router_1.ViewSongRouter,
    view_song_controller_1.ViewSongController,
    server_songs_service_1.SongsService,
    xml_router_1.XmlRouter,
    xml_controller_1.XmlController,
    xml_service_1.XmlService,
    song_analyze_service_1.SongAnalyzeService,
    server_main_1.ServerMain,
]);
//# sourceMappingURL=service-container.js.map