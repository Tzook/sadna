import {EnterRoomService} from '../choose-room/enter-room.service';
import {EVENT_ROOM} from '../choose-room/room.constants';
import {Injectable} from '@angular/core';

@Injectable()
export class ServerSocketService {
    private _io: SocketIO.Server;
    constructor(private _enterRoomService: EnterRoomService) {}

    init(io: SocketIO.Server) {
        this._io = io;
        this.onConnection();
    }

    private onConnection() {
        this._io.on("connection", (socket: SocketIO.Socket) => {
			console.log('Connected!!');
            this.onDisconnection(socket);
            this._enterRoomService.tryToEnterRoom(socket, socket.handshake.query["room"]);
		});
    }

    private onDisconnection(socket: SocketIO.Socket) {
        socket.on("disconnect", (error: string) => {
			console.log('Disconnect!!', error);
            this._enterRoomService.leaveRoom(socket);
		});
    }
}