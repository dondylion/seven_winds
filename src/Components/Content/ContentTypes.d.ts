type Row = {
    title: string // Наименование работ
    unit: string // Ед. изм.
    quantity: number // Количество
    unitPrice: number // Цена за ед.
    price: number // Стоимость
    id: number
    parent: number | null // id уровня, в котором находится (либо null для первого уровня)
    type: 'level' | 'row'
}

export declare type ContentProps = {
    rows: any;
}

export declare type ContentState = {
    editedElement: number | null;
    coveredIcon: number | null;
    createdElement: 'row' | 'firstLevel' | 'secondLevel';
    editMode: boolean;
}

export declare type EditFormProps = {
    type: 'level' | 'row';
    currentRow: Row | null;
    rows: Array<Row> | null;
    onFinish: Function;
    icon: any;
    parent?: number;
}

export declare type EditFormState = {
    unit: string | null;
    quantity: number | null;
    unitPrice: number | null;
    title: string | null;
}
