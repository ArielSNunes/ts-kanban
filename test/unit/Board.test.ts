import { Board } from "../../src/domain/entity/Board";

test("Deve criar um quadro", function () {
    const board = new Board(1, "Projeto 01");
    expect(board.name).toBe("Projeto 01");
});

test("Não deve criar um quadro sem nome", function () {
    expect(() => new Board(1, "")).toThrow(new Error('Name is required'));
});