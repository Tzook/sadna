import {AddSongService} from './add-song.service';
import {SongObject} from './song.object';
import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'add-song',
    styles: [`
        form {
            text-align: center;
            padding: 20px;
        }
        td {
            padding-bottom: 20px;
            vertical-align: top;
        }
        #submit {
            text-align: left;
        }
    `],
    template: `
        <form (ngSubmit)="onSubmit()" #addSongForm="ngForm">
            <table>
                <tr>
                    <td><label for="name">Name:</label></td>
                    <td><input type="text" placeholder="Name" id="name" [(ngModel)]="model.name" name="name" required></td>
                </tr>
                <tr>
                    <td><label for="writer">Writer:</label></td>
                    <td><input type="text" placeholder="Writer" id="writer" [(ngModel)]="model.writer" name="writer" required></td>
                </tr>
                <tr>
                    <td><label for="composer">Composer:</label></td>
                    <td><input type="text" placeholder="Composer" id="composer" [(ngModel)]="model.composer" name="composer" required></td>
                </tr>
                <tr>
                    <td><label for="text">Text:</label></td>
                    <td><textarea placeholder="Song text (At least 20 characters)" rows="10" minlength="20" id="text" [(ngModel)]="model.text" name="text" required></textarea></td>
                </tr>
                <tr>
                    <td></td>
                    <td id="submit"><button type="submit" [disabled]="!addSongForm.form.valid || loading">Add song</button></td>
                </tr>
            </table>

            <div [hidden]="!loading">
                Adding song...
            </div>
        </form>
    `,
    viewProviders: [AddSongService]
})
export class AddSongComponent {
    private model: SongObject;
    private loading: boolean;

    constructor(private addSongService: AddSongService) {
        this.model = new SongObject();
        this.loading = false;
    }

    private onSubmit() {
        // this.loading = true;
        console.log('Submitting', this.model);
        this.addSongService.addSong(this.model);
    }
}