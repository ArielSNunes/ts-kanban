import { PgPromiseConnection } from './infra/database/PgPromiseConnection';
import { BoardController } from './infra/controller/BoardController';
import { ExpressAdapter } from './infra/http/ExpressAdapter';

const connection = new PgPromiseConnection();
const expressAdapter = new ExpressAdapter();
new BoardController(expressAdapter, connection);

expressAdapter.listen(3003);

process.on('exit', async () => {
    await connection.close();
});