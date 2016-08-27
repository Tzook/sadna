import {Song} from '../db/server-db.model';
import {Component, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'song-info',
    styles: [`
        h2 {
            margin-bottom: 5px;
        }
    `],
    template: `
        <header>
            <h2>{{song.name}}</h2>
            <h3>Written by {{song.writer}} | Composed by {{song.composer}}</h3>
        </header>
    `
})
export class SongInfoComponent {
    @Input() song: Song;
}