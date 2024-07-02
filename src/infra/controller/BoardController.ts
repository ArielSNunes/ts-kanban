import { BoardService } from "../../service/BoardService";
import CardService from "../../service/CardService";
import { ColumnService } from "../../service/ColumnService";
import { BoardRepositoryDatabase } from "../Repository/BoardRepositoryDatabase";
import { CardRepositoryDatabase } from "../Repository/CardRepositoryDatabase";
import { ColumnRepositoryDatabase } from "../Repository/ColumRepositoryDatabase";
import { Connection } from "../database/Connection";
import { Http } from "../http/Http";

export class BoardController {
    constructor(readonly http: Http, readonly connection: Connection) {
        http.route('get', '/boards', async function (params: any, body: any) {
            const boardRepository = new BoardRepositoryDatabase(connection);
            const boardService = new BoardService(boardRepository);
            const boards = await boardService.getBoards();
            return boards;
        });

        http.route('get', '/boards/:boardId/columns', async function (params: any, body: any) {
            const columnRepository = new ColumnRepositoryDatabase(connection);
            const columnService = new ColumnService(columnRepository);
            const columns = await columnService.getColumns(parseInt(params.boardId));
            return columns;
        });

        http.route('get', '/boards/:boardId/columns/:columnId/cards', async function (params: any, body: any) {
            const cardRepository = new CardRepositoryDatabase(connection);
            const cardService = new CardService(cardRepository);
            const cards = await cardService.getCards(parseInt(params.columnId));
            return cards;
        });
    }
}