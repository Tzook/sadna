"use strict";
var groups_router_1 = require('../groups/groups.router');
var groups_middleware_1 = require('../groups/groups.middleware');
var groups_controller_1 = require('../groups/groups.controller');
var params_validator_1 = require('../Components/params.validator');
var view_song_router_1 = require('../view-song/view-song.router');
var view_song_controller_1 = require('../view-song/view-song.controller');
var add_song_controller_1 = require('../add-song/add-song.controller');
var song_analyze_service_1 = require('../songs/song-analyze.service');
var songs_list_controller_1 = require('../songs-list/songs-list.controller');
var songs_list_router_1 = require('../songs-list/songs-list.router');
var add_song_middleware_1 = require('../add-song/add-song.middleware');
var add_song_router_1 = require('../add-song/add-song.router');
var server_db_1 = require('./server-db');
var server_router_1 = require('./server-router');
var server_main_1 = require('./server-main');
var server_songs_router_1 = require('../routers/server-songs.router');
var server_songs_service_1 = require('../songs/server-songs.service');
var server_groups_service_1 = require('../groups/server-groups.service');
var server_words_service_1 = require('../words/server-words.service');
var xml_router_1 = require('../db/backup/xml.router');
var xml_controller_1 = require('../db/backup/xml.controller');
var xml_service_1 = require('../db/backup/xml.service');
var core_1 = require('@angular/core');
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