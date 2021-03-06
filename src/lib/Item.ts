export default class Item {
    name: string;
    coin: number;
    price: number;
    qty: number;
    qtyDesc: string;
    worldShare: boolean;
    storageUsage: string;
    alias: string;

    constructor(
        name: string,
        coin: number,
        price: number,
        qty: number,
        worldShare: boolean,
        storageUsage: string,
        qtyDesc = '',
        alias = '',
    ) {
        this.name = name;
        this.coin = coin;
        this.price = price;
        this.qty = qty;
        this.qtyDesc = qtyDesc;
        this.worldShare = worldShare;
        this.storageUsage = storageUsage;
        this.alias = alias;
    }

    public static createEmptyItem(name?: string) {
        return new Item(name || '', -1, 0, 0, true, '');
    }
}
