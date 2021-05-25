export default abstract class Table {
    table: (string | number)[][];
    headers?: string[];
    footers?: string[];

    constructor(table: (string | number)[][]) {
        this.table = table;
    }

    get columns() {
        return this.table[0].map((_, col) => this.table.map((row) => row[col]));
    }

    abstract addRow(row: number): void;

    abstract removeRow(row: number): void;
}
