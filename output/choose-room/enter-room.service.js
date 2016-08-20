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
const active_users_service_1 = require('../room/active-users.service');
const active_rooms_service_1 = require('../room/active-rooms.service');
const room_validator_service_1 = require('./room-validator.service');
const core_1 = require('@angular/core');
let EnterRoomService = class EnterRoomService {
    constructor(_roomValidatorService, _activeRoomsService, _activeUsersService) {
        this._roomValidatorService = _roomValidatorService;
        this._activeRoomsService = _activeRoomsService;
        this._activeUsersService = _activeUsersService;
    }
    tryToEnterRoom(socket, room) {
        console.log("trying to enter room", room);
        room = parseInt(room);
        if (this._roomValidatorService.isValid(room)) {
            if (this._activeRoomsService.isRoomFull(room)) {
                console.log("room is full");
            }
            else if (this._activeUsersService.isUserActive(socket)) {
                console.log("user already active");
            }
            else {
                console.log("entering user");
                this._activeUsersService.setUserActive(socket, room);
                this._activeRoomsService.enterRoom(socket, room);
            }
        }
        else {
            console.log("generating random room number.");
        }
    }
    leaveRoom(socket) {
        let room = this._activeUsersService.getUserRoom(socket);
        this._activeUsersService.deleteUser(socket);
        this._activeRoomsService.removeUser(socket, room);
    }
};
EnterRoomService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [room_validator_service_1.RoomValidatorService, active_rooms_service_1.ActiveRoomsService, active_users_service_1.ActiveUsersService])
], EnterRoomService);
exports.EnterRoomService = EnterRoomService;
//# sourceMappingURL=enter-room.service.js.map