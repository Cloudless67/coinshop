import Table from '@/table/Table';
import Item from '@/Item';
import { DateTime } from 'luxon';

export default {
    eventName: '18th',
    eventStart: DateTime.fromMillis(0),
    eventEnd: DateTime.fromMillis(0),
    coinNames: ['블루밍 코인', '위시코인'],
    punchKingName: '돌의 정령을 도와달람',

    itemsList: [] as Item[],
    punchKingScore: 0,
    union: 0,

    characterData: new Table([['크림슨임프'], ['테이피르'], ['이심검']]),
    itemCartData: new Table([
        ['', '', 0],
        ['', '', 0],
        ['', '', 0],
        ['', '', 0],
        ['', '', 0],
    ]),
};
