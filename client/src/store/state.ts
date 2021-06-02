import Table from '@/table/Table';
import Item from '@/Item';
import { DateTime } from 'luxon';
import Coin from '@/Coin';

export default {
    eventName: '18th',
    eventStart: DateTime.fromMillis(0),
    eventEnd: DateTime.fromMillis(0),
    coins: [] as Coin[],
    punchKingName: '펀치킹',
    neoCoreName: '위시 코인',
    coinBonusName: '유니온 가드닝',

    itemsList: [] as Item[],

    punchKingScore: 1500,
    neoCoreQty: 400,
    coinBonus: 0,

    characterData: new Table([['크림슨임프'], ['테이피르'], ['이심검']]),
    itemCartData: new Table([
        ['', '', 0],
        ['', '', 0],
        ['', '', 0],
        ['', '', 0],
        ['', '', 0],
    ]),
};
