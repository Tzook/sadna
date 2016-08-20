// import {ActiveUsersService} from '../room/active-users.service';
// import {ActiveRoomsService} from '../room/active-rooms.service';
// import {RoomValidatorService} from '../choose-room/room-validator.service';
// import {EnterRoomService} from '../choose-room/enter-room.service';
// import {ServerSocketService} from '../socket/server-socket.service';
import {DbService} from './server-db';
import {Router} from './server-router';
import {ServerMain} from './server-main';
import {SongsRouter} from '../routers/server-songs.router';
import { ReflectiveInjector } from '@angular/core';

export const serviceContainer = ReflectiveInjector.resolveAndCreate([
    DbService,
    Router,
    SongsRouter,
    ServerMain,

    // ServerSocketService,
    // EnterRoomService,
    // RoomValidatorService,
    // ActiveRoomsService,
    // ActiveUsersService,
]);