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