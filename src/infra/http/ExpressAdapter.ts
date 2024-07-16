import express, { Request, Response } from 'express';
import { Http } from "./Http";

export class ExpressAdapter implements Http {
    private app: any;

    constructor() {
        this.app = express();
        this.app.use(function (req: Request, res: Response, next: Function) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            next();
        })
    }

    route(method: string, url: string, callback: Function): void {
        this.app[method](url, async function (req: Request, res: Response) {
            const output = await callback(req.params, req.body);
            return res.json(output);
        })
    }

    listen(port: number): void {
        this.app.listen(port);
    }
}