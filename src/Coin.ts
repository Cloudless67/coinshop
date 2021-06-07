export default class Coin {
    id: number;
    name: string;
    worldScope: boolean;

    constructor(id: number, name: string, worldScope: boolean) {
        this.id = id;
        this.name = name;
        this.worldScope = worldScope;
    }
}
