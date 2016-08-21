"use strict";
// import {ActiveUsersService} from '../room/active-users.service';
// import {ActiveRoomsService} from '../room/active-rooms.service';
// import {RoomValidatorService} from '../choose-room/room-validator.service';
// import {EnterRoomService} from '../choose-room/enter-room.service';
// import {ServerSocketService} from '../socket/server-socket.service';
const server_db_1 = require('./server-db');
const server_router_1 = require('./server-router');
const server_main_1 = require('./server-main');
const server_songs_router_1 = require('../routers/server-songs.router');
const server_songs_service_1 = require('../songs/server-songs.service');
const core_1 = require('@angular/core');
exports.serviceContainer = core_1.ReflectiveInjector.resolveAndCreate([
    server_db_1.DbService,
    server_router_1.Router,
    server_songs_router_1.SongsRouter,
    server_songs_service_1.SongsService,
    server_main_1.ServerMain,
]);
//# sourceMappingURL=service-container.js.map