export default class Item {
    name: string;
    coin: number;
    price: number;
    qty: number;
    perCharacter: boolean;
    exchange: '가능' | '불가' | '1 회';

    constructor(
        name: string,
        coin: number,
        price: number,
        qty: number,
        perCharacter: boolean,
        exchange: '가능' | '불가' | '1 회',
    ) {
        this.name = name;
        this.coin = coin;
        this.price = price;
        this.qty = qty;
        this.perCharacter = perCharacter;
        this.exchange = exchange;
    }

    public static createEmptyItem() {
        return new Item('', -1, 0, 0, true, '가능');
    }
}
