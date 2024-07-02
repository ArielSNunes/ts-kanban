import { Board } from "../../domain/entity/Board";
import { BoardRepository } from "../../domain/repository/BoardRepository";

export class BoardRepositoryMemory implements BoardRepository {
    private boards: Board[] = [];

    constructor() {
        this.boards = [
            new Board('Projeto 01')
        ];
    }

    async findAll(): Promise<Board[]> {
        return this.boards;
    }
}