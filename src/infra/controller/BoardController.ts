import { BoardRepository } from "../../domain/repository/BoardRepository";
import { CardRepository } from "../../domain/repository/CardRepository";
import { ColumnRepository } from "../../domain/repository/ColumnRepository";
import { BoardService } from "../../service/BoardService";
import CardService from "../../service/CardService";
import { ColumnService } from "../../service/ColumnService";
import { Connection } from "../database/Connection";
import { Http } from "../http/Http";

export class BoardController {
    constructor(
        readonly http: Http,
        readonly connection: Connection,
        readonly boardRepository: BoardRepository,
        readonly columnRepository: ColumnRepository,
        readonly cardRepository: CardRepository
    ) {
        http.route('get', '/boards', async function (params: any, body: any) {
            const boardService = new BoardService(
                boardRepository,
                columnRepository,
                cardRepository
            );
            const boards = await boardService.getBoards();
            return boards;
        });

        http.route('get', '/boards/:boardId', async function (params: any, body: any) {
            const boardService = new BoardService(
                boardRepository,
                columnRepository,
                cardRepository
            );
            const board = await boardService.getBoard(params.boardId);
            return board;
        });

        http.route('get', '/boards/:boardId/columns', async function (params: any, body: any) {
            const columnService = new ColumnService(columnRepository);
            const columns = await columnService.getColumns(parseInt(params.boardId));
            return columns;
        });

        http.route('post', '/boards/:boardId/columns', async function (params: any, body: any) {
            const columnService = new ColumnService(columnRepository);
            const columnId = await columnService.saveColumn({
                boardId: body.boardId,
                hasEstimative: body.hasEstimative,
                name: body.name
            });
            return columnId;
        });

        http.route('get', '/boards/:boardId/columns/:columnId', async function (params: any, body: any) {
            const columnService = new ColumnService(columnRepository);
            const columns = await columnService.getColumn(parseInt(params.columnId));
            return columns;
        });

        http.route('delete', '/boards/:boardId/columns/:columnId', async function (params: any, body: any) {
            const columnService = new ColumnService(columnRepository);
            await columnService.deleteColumn(parseInt(params.columnId));
        });

        http.route('get', '/boards/:boardId/columns/:columnId/cards', async function (params: any, body: any) {
            const cardService = new CardService(cardRepository);
            const cards = await cardService.getCards(parseInt(params.columnId));
            return cards;
        });
    }
}