export default class Table {
    table: (string | number)[][];
    headers?: string[];
    footers?: string[];

    constructor(table: (string | number)[][]) {
        this.table = table;
    }

    get columns() {
        return this.table[0].map((_, col) => this.table.map(row => row[col]));
    }

    addRow(row: number, newRow: (string | number)[]): void {
        this.table.splice(row + 1, 0, newRow);
    }
    removeRow(row: number): void {
        console.log(row);
        this.table.splice(row, 1);
        console.log(this.table);
    }
}
