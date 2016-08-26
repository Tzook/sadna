import {MAX_NAME_LENGTH, MIN_SONG_LENGTH, MAX_SONG_LENGTH} from './add-song.constants';
import {AddSongService} from './add-song.service';
import {AddSong} from './add-song.model';
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
                    <td><input type="text" placeholder="Name" maxlength="${MAX_NAME_LENGTH}" id="name" [(ngModel)]="model.name" name="name" autofocus required></td>
                </tr>
                <tr>
                    <td><label for="writer">Writer:</label></td>
                    <td><input type="text" placeholder="Writer" maxlength="${MAX_NAME_LENGTH}" id="writer" [(ngModel)]="model.writer" name="writer" required></td>
                </tr>
                <tr>
                    <td><label for="composer">Composer:</label></td>
                    <td><input type="text" placeholder="Composer" maxlength="${MAX_NAME_LENGTH}" id="composer" [(ngModel)]="model.composer" name="composer" required></td>
                </tr>
                <tr>
                    <td><label for="text">Text:</label></td>
                    <td><textarea placeholder="Song text (At least ${MIN_SONG_LENGTH} characters)" minlength="${MIN_SONG_LENGTH}" maxlength="${MAX_SONG_LENGTH}" rows="10" id="text" [(ngModel)]="model.text" name="text" required></textarea></td>
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
    private model: AddSong;
    private loading: boolean;

    constructor(private addSongService: AddSongService) {
        this.model = new AddSong();
        this.loading = false;
    }

    private onSubmit() {
        // this.loading = true;
        console.log('Submitting', this.model);
        this.addSongService.addSong(this.model)
            .subscribe(
                success => {
                    console.log('success');
                    // do a toast?
                },
                error => console.log(error._body));
    }
}