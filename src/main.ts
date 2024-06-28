import express from 'express';
import pgPromise from 'pg-promise';

const app = express();
const connection = pgPromise()('postgres://Arielzito:c6t6dsfa9876sbd65cf976absdcf987@localhost:5432/');

app.get('/boards', async function (req, res) {
    const boards = await connection.query('select * from branas_kanban.boards', []);
    return res.json(boards);
})

app.listen(3003);