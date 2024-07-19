import axios from "axios"

test('Deve retornar os quadros via API', async function () {
    const response = await axios({
        url: 'http://localhost:3003/boards',
        method: 'get'
    });
    const boards = response.data;
    // expect(boards).toHaveLength(1);
    const [board] = boards;
    expect(board.name).toBe('Projeto 01');
    expect(board.id).toBe("1");
})

test('Deve retornar um quadro via API', async function () {
    const response = await axios({
        url: 'http://localhost:3003/boards/1',
        method: 'get'
    });

    const board = response.data;
    expect(board.name).toBe('Projeto 01');
    expect(board.id).toBe("1");
})

test('Deve retornar as colunas de um quadro via API', async function () {
    const response = await axios({
        url: 'http://localhost:3003/boards/1/columns',
        method: 'get'
    });
    const columns = response.data;
    // expect(columns).toHaveLength(3);
    const [colA, colB, colC] = columns;
    expect(colA.name).toEqual('Coluna A');
    expect(colA.id).toEqual('1');
    expect(colA.hasEstimative).toBe(true);
    expect(colB.name).toEqual('Coluna B');
    expect(colB.id).toEqual('2');
    expect(colC.name).toEqual('Coluna C');
    expect(colC.id).toEqual('3');
})

test('Deve salvar uma coluna', async function () {
    const saveResponse = await axios({
        url: 'http://localhost:3003/boards/1/columns',
        method: 'post',
        data: {
            boardId: 1,
            name: 'Todo',
            hasEstimative: true
        }
    });

    const columnId = saveResponse.data;

    const response = await axios({
        url: `http://localhost:3003/boards/1/columns/${columnId}`,
        method: 'get',
    });
    const column = response.data;

    expect(column.name).toBe('Todo');

    await axios({
        url: `http://localhost:3003/boards/1/columns/${columnId}`,
        method: 'delete'
    });
});

test('Deve retornar os cards de uma coluna de um quadro via API', async function () {
    const response = await axios({
        url: 'http://localhost:3003/boards/1/columns/1/cards',
        method: 'get'
    });
    const cards = response.data;
    // expect(cards).toHaveLength(3);
    const [cardA, cardB, cardC] = cards;
    expect(cardA.title).toEqual('Atividade 01');
    expect(cardB.title).toEqual('Atividade 02');
    expect(cardC.title).toEqual('Atividade 03');
})