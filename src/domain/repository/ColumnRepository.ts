import { Column } from "../entity/Column";

export interface ColumnRepository {
    findAllByBoardId(boardId: number): Promise<Column[]>;
    saveColumn(column: Column): Promise<number>;
    getColumn(id: number): Promise<Column>;
    deleteColumn(id: number): Promise<void>;
}