import { Column } from "../../domain/entity/Column";

import { ColumnRepository } from "../../domain/repository/ColumnRepository";
import { Connection } from "../database/Connection";

export class ColumnRepositoryDatabase implements ColumnRepository {
    constructor(readonly connection: Connection) { }

    async findAllByBoardId(boardId: number): Promise<Column[]> {
        const columnsData = await this.connection.query(
            "select name, has_estimative from columns where board_id = $1",
            [boardId]
        );
        const columns: Column[] = [];
        for (const columnData of columnsData) {
            columns.push(new Column(columnData.name, columnData.has_estimative));
        }
        return columns;
    }
}