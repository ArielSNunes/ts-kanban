import { PgPromiseConnection } from './infra/database/PgPromiseConnection';
import { BoardController } from './infra/controller/BoardController';
import { ExpressAdapter } from './infra/http/ExpressAdapter';
import { BoardRepositoryDatabase } from './infra/Repository/BoardRepositoryDatabase';
import { ColumnRepositoryDatabase } from './infra/Repository/ColumRepositoryDatabase';
import { CardRepositoryDatabase } from './infra/Repository/CardRepositoryDatabase';

const connection = new PgPromiseConnection();
const expressAdapter = new ExpressAdapter();
const boardRepository = new BoardRepositoryDatabase(connection);
const columnRepository = new ColumnRepositoryDatabase(connection);
const cardRepository = new CardRepositoryDatabase(connection);
new BoardController(
    expressAdapter,
    connection,
    boardRepository,
    columnRepository,
    cardRepository
);

expressAdapter.listen(3003);

process.on('exit', async () => {
    await connection.close();
});