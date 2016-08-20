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
const core_1 = require('@angular/core');
let ActiveRoomsService = class ActiveRoomsService {
    constructor() {
        this._rooms = new Map();
    }
    isRoomFull(room) {
        let roomSockets = this._rooms.get(room);
        return Array.isArray(roomSockets) && roomSockets.length > 1;
    }
    enterRoom(socket, room) {
        let newArray = [socket];
        if (this._rooms.has(room)) {
            newArray.push(this._rooms.get(room)[0]);
        }
        this._rooms.set(room, newArray);
    }
    removeUser(socket, room) {
        let users = this._rooms.get(room);
        if (users) {
            let newArray = [];
            if (users[0].id === socket.id) {
                if (users[1]) {
                    newArray.push(users[1]);
                }
            }
            else if (users[1] && users[1].id === socket.id) {
                newArray.push(users[0]);
            }
            else {
                console.log("A bad error occured, code should NOT reach here");
                return;
            }
            if (newArray.length > 0) {
                this._rooms.set(room, newArray);
            }
            else {
                this._rooms.delete(room);
            }
        }
    }
};
ActiveRoomsService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], ActiveRoomsService);
exports.ActiveRoomsService = ActiveRoomsService;
//# sourceMappingURL=active-rooms.service.js.map