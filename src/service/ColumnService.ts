import { ColumnRepository } from "../domain/repository/ColumnRepository";
import { SaveColumnInput } from "../domain/input/SaveColumnInput";
import { Column } from "../domain/entity/Column";

export class ColumnService {
    constructor(readonly columnRepository: ColumnRepository) { }

    async getColumns(boardId: number): Promise<Column[]> {
        return this.columnRepository.findAllByBoardId(boardId);
    }

    async saveColumn(input: SaveColumnInput): Promise<number> {
        return this.columnRepository.saveColumn(new Column(
            input.boardId,
            1,
            input.name,
            input.hasEstimative
        ));
    }

    async getColumn(id: number): Promise<Column> {
        return this.columnRepository.getColumn(id);
    }

    async deleteColumn(id: number): Promise<void> {
        return this.columnRepository.deleteColumn(id);
    }
}