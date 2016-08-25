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
const add_song_service_1 = require('./add-song.service');
const song_object_1 = require('./song.object');
const core_1 = require('@angular/core');
let AddSongComponent = class AddSongComponent {
    constructor(addSongService) {
        this.addSongService = addSongService;
        this.model = new song_object_1.SongObject();
        this.loading = false;
    }
    onSubmit() {
        // this.loading = true;
        console.log('Submitting', this.model);
        this.addSongService.addSong(this.model);
    }
};
AddSongComponent = __decorate([
    core_1.Component({
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
        viewProviders: [add_song_service_1.AddSongService]
    }), 
    __metadata('design:paramtypes', [add_song_service_1.AddSongService])
], AddSongComponent);
exports.AddSongComponent = AddSongComponent;
//# sourceMappingURL=add-song.component.js.map