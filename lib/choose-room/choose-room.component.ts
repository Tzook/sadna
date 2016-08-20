import {MAX_ROOM_NUMBER, MIN_ROOM_NUMBER} from './room.constants';
import {ClientSocketService} from '../socket/client-socket.service';
import {Component} from '@angular/core';

@Component({
    selector: 'choose-room',
    template: `
        <h1>Hello!</h1>
        <button [disabled]="_loading" (click)="joinRoom()">Create room</button>
        <p>OR</p>
        <input #_room (keyup)="0" type="number" placeholder="Room" [max]="_maxRoom" [min]="_minRoom" required>
        <button [disabled]="!_room.value || _loading" (click)="joinRoom(_room.value)">Join room</button>
    `
})
export class ChooseRoomComponent {
    private _maxRoom: number;
    private _minRoom: number;
    private _loading: boolean;

    constructor(private _clientSocketService: ClientSocketService) {
        this._maxRoom = MAX_ROOM_NUMBER;
        this._minRoom = MIN_ROOM_NUMBER;
        this._loading = false;
    }

    private joinRoom(roomValue?: string) {
        this._loading = true;
        this._clientSocketService.connect(roomValue)
            .then((roomNumber: string) => {
                this._loading = false;
                console.log("connected to room", roomNumber);
            })
            .catch((error) => {
                this._loading = false;
                console.log(error);
            });
    }
}