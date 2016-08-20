import { Injectable } from '@angular/core';

@Injectable()
export class ActiveUsersService {
    private _users: Map<string, number>;

    constructor() {
        this._users = new Map<string, number>();
     }

    isUserActive(socket: SocketIO.Socket): boolean {
        return this._users.has(socket.id);
    }

    setUserActive(socket: SocketIO.Socket, room: number) {
        this._users.set(socket.id, room);
    }

    getUserRoom(socket: SocketIO.Socket): number {
        return this._users.get(socket.id);
    }

    deleteUser(socket: SocketIO.Socket) {
        this._users.delete(socket.id);
    }
}