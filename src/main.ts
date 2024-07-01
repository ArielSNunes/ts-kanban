import express from 'express';
import pgPromise from 'pg-promise';
import { Board } from './entity/Board';
import { Column } from './entity/Column';
import { Card } from './entity/Card';

const app = express();
const connection = pgPromise()('postgres://Arielzito:c6t6dsfa9876sbd65cf976absdcf987@localhost:5432/testing');

app.get('/boards', async function (req, res) {
    const boardsData = await connection.query('select name from boards', []);
    const boards: Board[] = [];
    for (const boardData of boardsData) {
        boards.push(new Board(boardData.name));
    }
    return res.json(boards);
});

app.get('/boards/:boardId/columns', async function (req, res) {
    const columnsData = await connection.query(
        "select name, has_estimative from columns where board_id = $1",
        [req.params.boardId]
    );
    const columns: Column[] = [];
    for (const columnData of columnsData) {
        columns.push(new Column(columnData.name, columnData.has_estimative));
    }
    return res.json(columns);
});

app.get('/boards/:boardId/columns/:columnId/cards', async function (req, res) {
    const cardsData = await connection.query(
        "select title, estimative from cards where column_id = $1",
        [req.params.columnId]
    );
    const cards: Card[] = [];
    for (const cardData of cardsData) {
        cards.push(new Card(cardData.title, cardData.estimative));
    }
    return res.json(cards);
});

app.listen(3003);