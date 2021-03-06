export interface Result {
    command: string,
    rowCount: number,
    oid: string,
    fields: any[],
    rows: Row[],
    addRow: (row: Row) => void
}

interface Row {
    id?: number,
}

export interface DbError {
    error: string,
    name: string,
    length: number,
    severity: string,
    code: string,
    detail: string,
    hint: string,
    position: string,
    internalPosition: string,
    internalQuery: string,
    where: string,
    schema: string,
    table: string,
    column: string,
    dataType: string,
    constraint: string,
    file: string,
    line: string,
    routine: string,
}

export interface Song extends Row {
    name: string,
    path?: string,
    writer?: string,
    composer?: string,
}

export interface SongResult extends Result {
    rows: Song[],
    addRow: (row: Song) => void,
}

export interface Word extends Row {
    value: string,
    is_punctuation?: boolean,
}

export interface WordResult extends Result {
    rows: Word[],
    addRow: (row: Word) => void,
}

export interface WordInSong extends Row {
    song_id?: number,
    word_id?: number,
    col: number,
    row: number,
    house: number,
    sentence: number,
    word_num: number,
}

export interface CompleteWordInSong {
    words: Word[],
    wordsInSong: WordInSong[],
    letters: number,
}

export interface WordInSongResult extends Result {
    rows: WordInSong[],
    addRow: (row: WordInSong) => void,
}

// complete song is a join of all our data on this song
export interface CompleteSong extends WordInSong {
    word_value: string,
    is_punctuation: boolean,
}

export interface CompleteSongResult extends Result {
    rows: CompleteSong[],
    addRow: (row: CompleteSong) => void,
}

export interface Group extends Row {
    name: string,
    is_expression?: boolean,
}

export interface GroupResult extends Result {
    rows: Group[],
    addRow: (row: Group) => void,
}

export interface WordInGroup extends Row {
    group_id: number,
    word_id: number,
}

export interface WordInGroupResult extends Result {
    rows: WordInGroup[],
    addRow: (row: WordInGroup) => void,
}

export interface CompleteWordInGroup extends Result {
    value: string
}

export interface CompleteWordInGroupResult extends Result {
    rows: CompleteWordInGroup[],
}

export interface WordStatistics extends Row {
    value: string,
    is_punctuation: boolean,
    word_count: number,
    word_length: number,
}

export interface WordStatisticsResult extends Result {
    rows: WordStatistics[],
    addRow: (row: WordStatistics) => void,
}

interface SongStatistics extends Row {
    word_count: number,
    letter_count: number,
}

export interface SongStatisticsRows extends SongStatistics {
    row: string,
}

export interface SongStatisticsRowsResult extends Result {
    rows: SongStatisticsRows[],
    addRow: (row: SongStatisticsRows) => void,
}

export interface SongStatisticsHouses extends SongStatistics {
    house: string,
}

export interface SongStatisticsHousesResult extends Result {
    rows: SongStatisticsHouses[],
    addRow: (row: SongStatisticsHouses) => void,
}