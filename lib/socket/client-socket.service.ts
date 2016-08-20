import {EVENT_ROOM} from '../choose-room/room.constants';
import {Injectable} from '@angular/core';
import * as io from "socket.io-client";

@Injectable()
export class ClientSocketService {
    private _socket: SocketIOClient.Socket;
    constructor() { }

    connect(room?: string): Promise<string> {
        let options: any = room ? { query: "room=" + room } : {};
        options["force new connection"] = false;
        this._socket = io(location.host, options);

        return new Promise((resolve, reject) => {
            this._socket.on('connect', () => {
                console.log('Connection!');
                this._socket.removeListener('connect');

                this._socket.on(EVENT_ROOM, data => {
                    console.log('Room!', data);
                    this._socket.removeListener('room');
                    resolve(data.room);
                });
            });

            this._socket.on('error', data => {
                console.log('error!', data);
                reject(data);
            });

            this._socket.on('disconnect', () => {
                console.log('disconnect');
                reject('disconnected');
            });
        });
    }
}