import {CompleteWordInSong} from '../db/server-db.model';
import {SongAnalyzeService} from '../songs/song-analyze.service';
import {Component, OnInit, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'song-stats',
    styles: [`

    `],
    template: `
        <div *ngIf="analyzed">
            <h2>Song stats:</h2>
            <p>{{houses}} houses, {{words}} words, {{letters}} letters.</p>
        </div>
    `,
    viewProviders: [SongAnalyzeService]
})
export class SongStatsComponent implements OnInit {
    @Input() song: string;

    private houses: number;
    private words: number;
    private letters: number;
    private analyzed: boolean;

    constructor(private songAnalyzeService: SongAnalyzeService) {
        this.analyzed = false;
    }

    ngOnInit() {
        this.songAnalyzeService.analyze(this.song, true)
            .then(wordsResult => {
                this.houses = wordsResult.wordsInSong[wordsResult.wordsInSong.length - 1].house + 1;
                this.words = wordsResult.words.length;
                this.letters = wordsResult.letters;
                this.analyzed = true;
            });
    }
}