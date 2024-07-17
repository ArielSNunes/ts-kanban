import pgPromise from "pg-promise";
import { Board } from "../../domain/entity/Board";
import { Card } from "../../domain/entity/Card";
import { BoardRepository } from "../../domain/repository/BoardRepository";
import { Connection } from "../database/Connection";

export class BoardRepositoryDatabase implements BoardRepository {
    constructor(readonly connection: Connection) { }

    async findAll(): Promise<Board[]> {
        const boardsData = await this.connection.query('select name, id from boards', []);
        const boards: Board[] = [];
        for (const boardData of boardsData) {
            const board = new Board(boardData.id, boardData.name);
            boards.push(board);
        }
        return boards;
    }

    async findById(boardId: number): Promise<Board> {
        const [boardData] = await this.connection.query(
            'select name, id from boards where boards.id = $1',
            [boardId]
        );

        if (!boardData) throw new Error('Board not found');

        return new Board(boardData.id, boardData.name);
    }
}