export class Board {
    constructor(readonly id: number, readonly name: string) {
        if (!name) {
            throw new Error('Name is required');
        }
    }
}