export type TableInfo = {
    headers: string[];
    bodyData: TableRow[];
};

export type TableRow = TableData[];

export type TableData = {
    data: string | number;
    editable: boolean;
};
