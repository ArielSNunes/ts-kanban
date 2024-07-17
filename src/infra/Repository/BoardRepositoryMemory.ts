import { Board } from "../../domain/entity/Board";
import { BoardRepository } from "../../domain/repository/BoardRepository";

export class BoardRepositoryMemory implements BoardRepository {
    private boards: Board[] = [];

    constructor() {
        this.boards = [
            new Board(1, 'Projeto 01')
        ];
    }

    async findAll(): Promise<Board[]> {
        return this.boards;
    }

    async findById(boardId: number): Promise<Board> {
        return this.boards[boardId];
    }
}