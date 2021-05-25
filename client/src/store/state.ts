import CharacterTable from '@/table/CharacterTable';
import { DateTime } from 'luxon';

export default {
    eventStart: DateTime.fromMillis(0),
    eventEnd: DateTime.fromMillis(0),
    punchKingScore: 0,
    union: 0,

    characterData: new CharacterTable([['본캐']]),
};
