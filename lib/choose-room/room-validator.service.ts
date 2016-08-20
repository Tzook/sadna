import {MIN_ROOM_NUMBER, MAX_ROOM_NUMBER} from './room.constants';
import {Injectable} from '@angular/core';

@Injectable()
export class RoomValidatorService {
    isValid(room: number): boolean {
        return room >= MIN_ROOM_NUMBER && room <= MAX_ROOM_NUMBER;
    }
}