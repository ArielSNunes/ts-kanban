export class Card {
    constructor(
        readonly columnId: number,
        readonly id: number,
        readonly title: string,
        readonly estimative: number
    ) {
        if (!title) {
            throw new Error('Title is required');
        }

        if (estimative < 0) {
            throw new Error('Estimative must be positive');
        }
    }
}