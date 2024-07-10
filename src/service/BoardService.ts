import { Board } from "../domain/entity/Board";
import { GetBoardOutput } from "../domain/output/GetBoardOutput";
import { BoardRepository } from "../domain/repository/BoardRepository";
import { CardRepository } from "../domain/repository/CardRepository";
import { ColumnRepository } from "../domain/repository/ColumnRepository";

export class BoardService {

    constructor(
        readonly boardRepository: BoardRepository,
        readonly columnRepository: ColumnRepository,
        readonly cardRepository: CardRepository
    ) { }

    async getBoards(): Promise<Board[]> {
        const boards = await this.boardRepository.findAll();
        return boards;
    }

    async getBoard(boardId: number): Promise<GetBoardOutput> {
        const board = await this.boardRepository.findById(boardId);
        const getBoardOutput: GetBoardOutput = {
            name: board.name,
            estimative: 0,
            columns: []
        };

        const columns = await this.columnRepository.findAllByBoardId(boardId);
        for (const column of columns) {
            getBoardOutput.columns.push({
                cards: [],
                estimative: 0,
                hasEstimative: column.hasEstimative,
                name: column.name
            })
        }
        return getBoardOutput;
    }
    async saveBoard(): Promise<void> { }
    async updateBoard(): Promise<void> { }
}