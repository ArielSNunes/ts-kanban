import { BoardRepositoryDatabase } from "../../src/infra/Repository/BoardRepositoryDatabase";
import { CardRepositoryDatabase } from "../../src/infra/Repository/CardRepositoryDatabase";
import { ColumnRepositoryDatabase } from "../../src/infra/Repository/ColumRepositoryDatabase";
import { PgPromiseConnection } from "../../src/infra/database/PgPromiseConnection";
import { BoardService } from "../../src/service/BoardService"

test('Deve listar os quadros', async function () {
    const connection = new PgPromiseConnection();
    const boardRepository = new BoardRepositoryDatabase(connection);
    const columnRepository = new ColumnRepositoryDatabase(connection);
    const cardRepository = new CardRepositoryDatabase(connection);
    const boardService = new BoardService(
        boardRepository,
        columnRepository,
        cardRepository
    );
    const boards = await boardService.getBoards();
    expect(boards).toHaveLength(1);
    const [board] = boards;
    expect(board.name).toBe('Projeto 01');
    await connection.close();
    // expect(board.estimative).toBe(6);
});

test('Deve listar um quadro', async function () {
    const connection = new PgPromiseConnection();
    const boardRepository = new BoardRepositoryDatabase(connection);
    const columnRepository = new ColumnRepositoryDatabase(connection);
    const cardRepository = new CardRepositoryDatabase(connection);
    const boardService = new BoardService(
        boardRepository,
        columnRepository,
        cardRepository
    );
    const board = await boardService.getBoard(1);
    expect(board.name).toBe('Projeto 01');
    expect(board.columns).toHaveLength(3);
    const [a, b, c] = board.columns;
    expect(a.name).toBe('Coluna A');
    expect(b.name).toBe('Coluna B');
    expect(c.name).toBe('Coluna C');
    expect(a.estimative).toBe(6);
    expect(b.estimative).toBe(0);
    expect(c.estimative).toBe(0);
    expect(board.estimative).toBe(6);
    const [cardA, cardB, cardC] = a.cards;
    expect(cardA.title).toBe('Atividade 01');
    expect(cardB.title).toBe('Atividade 02');
    expect(cardC.title).toBe('Atividade 03');
    expect(cardA.estimative).toBe(3);
    expect(cardB.estimative).toBe(2);
    expect(cardC.estimative).toBe(1);
    await connection.close();
})