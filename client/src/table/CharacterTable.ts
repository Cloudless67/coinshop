import Table from './Table';

export default class CharacterTable extends Table {
    addRow(row: number): void {
        this.table.splice(row + 1, 0, ['']);
    }
    removeRow(row: number): void {
        console.log(row);
        this.table.splice(row, 1);
        console.log(this.table);
    }
}
