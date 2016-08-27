import {CompleteSong} from '../db/server-db.model';
import {ActivatedRoute} from '@angular/router';
import {ViewSongService} from './view-song.service';
import {UniqueWordsService} from '../words/unique-words.service';
import {SongInfoComponent} from '../songs/song-info.component';
import {Component, OnInit} from '@angular/core';
import {Song} from '../db/server-db.model';

@Component({
    moduleId: module.id,
    selector: 'view-song',
    styles: [`
        song-info {
            text-align: center;
        }
        #words {
            margin-top: 40px;
        }
        h2 {
            margin-bottom: 10px;
        }
        span:not(:last-child):after {
            content: " | ";
        }
        span {
            font-size: 18px;
            line-height: 30px;
            letter-spacing: 2px;
        }
    `],
    template: `
        <song-info [song]="song"></song-info>
        <div id="words">
            <h2>Words in the song:</h2>
            <span *ngFor="let word of uniqueWords">
                {{word.word_value}}
            </span>
        </div>
    `,
    directives: [SongInfoComponent],
    viewProviders: [ViewSongService, UniqueWordsService]
})
export class ViewSongComponent implements OnInit {
    private words: CompleteSong[];
    private uniqueWords: CompleteSong[];
    private song: Song;

    constructor(private viewSongService: ViewSongService,
                private uniqueWordsService: UniqueWordsService,
                private route: ActivatedRoute) {
        this.words = [];
        this.uniqueWords = [];
    }

    ngOnInit() {
        let params = this.route.snapshot.params;
        this.song = <Song>params;
        this.viewSongService.getSong(params["id"])
                .subscribe(
                    success => {
                        this.words = success.json();
                        this.uniqueWords = this.uniqueWordsService.getUniqueWords(this.words);
                    },
                    error => console.log(error)
                );
    }
}