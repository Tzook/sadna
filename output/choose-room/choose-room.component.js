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
const room_constants_1 = require('./room.constants');
const client_socket_service_1 = require('../socket/client-socket.service');
const core_1 = require('@angular/core');
let ChooseRoomComponent = class ChooseRoomComponent {
    constructor(_clientSocketService) {
        this._clientSocketService = _clientSocketService;
        this._maxRoom = room_constants_1.MAX_ROOM_NUMBER;
        this._minRoom = room_constants_1.MIN_ROOM_NUMBER;
        this._loading = false;
    }
    joinRoom(roomValue) {
        this._loading = true;
        this._clientSocketService.connect(roomValue)
            .then((roomNumber) => {
            this._loading = false;
            console.log("connected to room", roomNumber);
        })
            .catch((error) => {
            this._loading = false;
            console.log(error);
        });
    }
};
ChooseRoomComponent = __decorate([
    core_1.Component({
        selector: 'choose-room',
        template: `
        <h1>Hello!</h1>
        <button [disabled]="_loading" (click)="joinRoom()">Create room</button>
        <p>OR</p>
        <input #_room (keyup)="0" type="number" placeholder="Room" [max]="_maxRoom" [min]="_minRoom" required>
        <button [disabled]="!_room.value || _loading" (click)="joinRoom(_room.value)">Join room</button>
    `
    }), 
    __metadata('design:paramtypes', [client_socket_service_1.ClientSocketService])
], ChooseRoomComponent);
exports.ChooseRoomComponent = ChooseRoomComponent;
//# sourceMappingURL=choose-room.component.js.map