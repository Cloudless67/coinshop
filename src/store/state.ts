import Table from '@/lib/Table';
import Item from '@/lib/Item';
import Coin from '@/lib/Coin';
import dayjs from 'dayjs';

export default {
    eventName: '18th',
    eventStart: dayjs(),
    eventEnd: dayjs(),
    today: dayjs().startOf('date'),
    coins: [] as Coin[],
    punchKingName: '펀치킹',
    neoCoreName: '검은콩',
    coinBonusName: '유니온 가드닝',

    itemsList: [] as Item[],

    punchKingScore: 1500,
    neoCoreQty: 400,
    coinBonus: [0, 0, 0],

    autoUpdateCoins: true,
    characterData: new Table([
        ['본캐', 0, 39300, 0],
        ['부캐', 0, 28800, 0],
    ]),
    itemCartData: new Table([
        ['', '', 0, 0],
        ['', '', 0, 0],
        ['', '', 0, 0],
        ['', '', 0, 0],
        ['', '', 0, 0],
    ]),
};
