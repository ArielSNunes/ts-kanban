export class Column {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly hasEstimative: boolean
    ) {
        if (!name) {
            throw new Error('Name is required');
        }
    }
}