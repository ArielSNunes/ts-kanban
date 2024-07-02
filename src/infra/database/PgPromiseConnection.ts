import pgPromise from "pg-promise";
import { Connection } from "./Connection";

export class PgPromiseConnection implements Connection {
    private connection: any;

    constructor() {
        this.connection = pgPromise()('postgres://Arielzito:c6t6dsfa9876sbd65cf976absdcf987@localhost:5432/testing');
    }

    query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params)
    }

    close(): Promise<void> {
        return this.connection.$pool.end();
    }
}