import express from 'express';
import pgPromise from 'pg-promise';

const app = express();
const connection = pgPromise()('postgres://Arielzito:c6t6dsfa9876sbd65cf976absdcf987@localhost:5432/testing');

app.get('/boards', async function (req, res) {
    const boards = await connection.query('select * from boards', []);
    return res.json(boards);
});

app.get('/boards/:boardId/columns', async function (req, res) {
    const boards = await connection.query('select * from columns where board_id = ?', [req.params.boardId]);
    return res.json(boards);
});

app.listen(3003);