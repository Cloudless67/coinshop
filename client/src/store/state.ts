import Table from '@/table/Table';
import Item from '@/Item';
import { DateTime } from 'luxon';

export default {
    eventName: '18th',
    eventStart: DateTime.fromMillis(0),
    eventEnd: DateTime.fromMillis(0),
    coinNames: ['블루밍 코인', '위시코인'],
    punchKingName: '돌의 정령을 도와달람',

    itemsList: [
        {
            name: '이벤트링 전용 명장의 큐브',
            coin: 0,
            price: 100,
            qty: 100,
            perCharacter: true,
            exchange: '불가',
        },
        {
            name: '카오스링 교환권',
            coin: 0,
            price: 3500,
            qty: 1,
            perCharacter: true,
            exchange: '불가',
        },
        {
            name: '딥다크 크리티컬 링',
            coin: 0,
            price: 3500,
            qty: 1,
            perCharacter: true,
            exchange: '1 회',
        },
        {
            name: '익스트림 성장의 비약',
            coin: 0,
            price: 200,
            qty: 30,
            perCharacter: false,
            exchange: '가능',
        },
        {
            name: '에디셔널 큐브',
            coin: 1,
            price: 40,
            qty: 15,
            perCharacter: true,
            exchange: '가능',
        },
    ] as Item[],
    punchKingScore: 0,
    union: 0,

    characterData: new Table([['본캐']]),
    itemCartData: new Table([
        ['', '', 0],
        ['', '', 0],
        ['', '', 0],
        ['', '', 0],
        ['', '', 0],
    ]),
};
