import { BoardRepositoryDatabase } from "../../src/infra/Repository/BoardRepositoryDatabase";
import { PgPromiseConnection } from "../../src/infra/database/PgPromiseConnection";
import { BoardService } from "../../src/service/BoardService"

test('Deve listar os quadros', async function () {
    const connection = new PgPromiseConnection();
    const boardRepository = new BoardRepositoryDatabase(connection);
    const boardService = new BoardService(boardRepository);
    const boards = await boardService.getBoards();
    expect(boards).toHaveLength(1);
    const [board] = boards;
    expect(board.name).toBe('Projeto 01');
    // expect(board.estimative).toBe(6);
})