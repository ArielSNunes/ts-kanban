import { Column } from "../../domain/entity/Column";

import { ColumnRepository } from "../../domain/repository/ColumnRepository";
import { Connection } from "../database/Connection";

export class ColumnRepositoryDatabase implements ColumnRepository {
    constructor(readonly connection: Connection) { }

    async findAllByBoardId(boardId: number): Promise<Column[]> {
        const columnsData = await this.connection.query(
            "select id, board_id, name, has_estimative from columns where board_id = $1",
            [boardId]
        );
        const columns: Column[] = [];
        for (const columnData of columnsData) {
            columns.push(new Column(
                columnData.board_id,
                columnData.id,
                columnData.name,
                columnData.has_estimative
            ));
        }
        return columns;
    }

    async saveColumn(column: Column): Promise<number> {
        const [columnData] = await this.connection.query(
            "insert into columns (board_id, name, has_estimative) values ($1, $2, $3) returning id",
            [column.boardId, column.name, column.hasEstimative]
        );

        return columnData.id;
    }

    async getColumn(id: number): Promise<Column> {
        const [columnData] = await this.connection.query(
            "select id, board_id, name, has_estimative from columns where id = $1",
            [id]
        );

        if (!columnData) throw new Error('Column not found');

        return new Column(
            columnData.board_id,
            columnData.id,
            columnData.name,
            columnData.has_estimative
        )
    }

    async deleteColumn(id: number): Promise<void> { 
        await this.connection.query(
            "delete from columns where id = $1",
            [id]
        );
    }
}