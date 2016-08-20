"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const enter_room_service_1 = require('../choose-room/enter-room.service');
const core_1 = require('@angular/core');
let ServerSocketService = class ServerSocketService {
    constructor(_enterRoomService) {
        this._enterRoomService = _enterRoomService;
    }
    init(io) {
        this._io = io;
        this.onConnection();
    }
    onConnection() {
        this._io.on("connection", (socket) => {
            console.log('Connected!!');
            this.onDisconnection(socket);
            this._enterRoomService.tryToEnterRoom(socket, socket.handshake.query["room"]);
        });
    }
    onDisconnection(socket) {
        socket.on("disconnect", (error) => {
            console.log('Disconnect!!', error);
            this._enterRoomService.leaveRoom(socket);
        });
    }
};
ServerSocketService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [enter_room_service_1.EnterRoomService])
], ServerSocketService);
exports.ServerSocketService = ServerSocketService;
//# sourceMappingURL=server-socket.service.js.map