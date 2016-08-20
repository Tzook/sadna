import {ActiveUsersService} from './active-users.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ActiveRoomsService {
    private _rooms: Map<number, SocketIO.Socket[]>;

    constructor() {
        this._rooms = new Map<number, SocketIO.Socket[]>();
    }

    isRoomFull(room: number): boolean {
        let roomSockets = this._rooms.get(room);
        return Array.isArray(roomSockets) && roomSockets.length > 1;
    }

    enterRoom(socket: SocketIO.Socket, room: number) {
        let newArray = [socket];
        if (this._rooms.has(room)) {
            newArray.push(this._rooms.get(room)[0]);
        }
        this._rooms.set(room, newArray);
    }

    removeUser(socket: SocketIO.Socket, room: number) {
        let users = this._rooms.get(room);
        if (users) {
            let newArray = [];
            if (users[0].id === socket.id) {
                if (users[1]) {
                    newArray.push(users[1]);
                }
            } else if (users[1] && users[1].id === socket.id) {
                newArray.push(users[0]);
            } else {
                console.log("A bad error occured, code should NOT reach here");
                return;
            }
            if (newArray.length > 0) {
                this._rooms.set(room, newArray);
            } else {
                this._rooms.delete(room);
            }
        }
    }
}