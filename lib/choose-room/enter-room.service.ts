import {ActiveUsersService} from '../room/active-users.service';
import {ActiveRoomsService} from '../room/active-rooms.service';
import {RoomValidatorService} from './room-validator.service';
import {Injectable} from '@angular/core';

@Injectable()
export class EnterRoomService {
    constructor(private _roomValidatorService: RoomValidatorService,
                private _activeRoomsService: ActiveRoomsService,
                private _activeUsersService: ActiveUsersService) { }

    tryToEnterRoom(socket: SocketIO.Socket, room: any) {
        console.log("trying to enter room", room);
        room = parseInt(room);
        if (this._roomValidatorService.isValid(room)) {
            if (this._activeRoomsService.isRoomFull(room)) {
                console.log("room is full");
                // TODO throw an error to the client
            } else if (this._activeUsersService.isUserActive(socket)) {
                console.log("user already active");
                // TODO throw an error to the client
            } else {
                console.log("entering user");
                this._activeUsersService.setUserActive(socket, room);
                this._activeRoomsService.enterRoom(socket, room);
            }
        } else {
            console.log("generating random room number.");
            // TODO generate a random empty room number
        }
    }

    leaveRoom(socket: SocketIO.Socket) {
        let room = this._activeUsersService.getUserRoom(socket);
        this._activeUsersService.deleteUser(socket);
        this._activeRoomsService.removeUser(socket, room);
    }
}