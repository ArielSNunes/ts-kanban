import { SaveColumnInput } from "../../src/domain/input/SaveColumnInput";
import { PgPromiseConnection } from "../../src/infra/database/PgPromiseConnection";
import { ColumnRepositoryDatabase } from "../../src/infra/Repository/ColumRepositoryDatabase";
import { ColumnService } from "../../src/service/ColumnService";

test('Deve salvar uma coluna', async function () {
    const connection = new PgPromiseConnection();
    const columnRepository = new ColumnRepositoryDatabase(connection);
    const columnService = new ColumnService(columnRepository);
    const columnId = await columnService.saveColumn({
        boardId: 1,
        name: 'Todo',
        hasEstimative: true
    });
    const column = await columnService.getColumn(columnId);
    expect(column.name).toBe('Todo');
    await columnService.deleteColumn(columnId);
    await connection.close();
});