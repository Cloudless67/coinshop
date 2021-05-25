import ITableCell from '@/Table/ITableCell';
import { DateTime } from 'luxon';

export type TableMetadata = {
    name: string;
    highlightFirstColumn: boolean;
    fixedRows: boolean;
    rowConstructor: (row: number) => ITableCell[];
};

export type EventDuration = { eventStart: DateTime; eventEnd: DateTime };

export type RowAndNickname = { row: number; nickname: string };
