import { Board } from "../domain/entity/Board";
import { GetBoardOutput } from "../domain/output/GetBoardOutput";
import { BoardRepository } from "../domain/repository/BoardRepository";

export class BoardService {

    constructor(readonly boardRepository: BoardRepository) { }

    async getBoards(): Promise<Board[]> {
        const boards = await this.boardRepository.findAll();
        return boards;
    }

    async getBoard(boardId: number): Promise<GetBoardOutput> { }
    async saveBoard(): Promise<void> { }
    async updateBoard(): Promise<void> { }
}