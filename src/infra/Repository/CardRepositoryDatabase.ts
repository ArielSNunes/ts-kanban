import { Card } from "../../domain/entity/Card";
import { CardRepository } from "../../domain/repository/CardRepository";
import { Connection } from "../database/Connection";

export class CardRepositoryDatabase implements CardRepository {
    constructor(readonly connection: Connection) { }

    async findAllByColumnId(columnId: number): Promise<Card[]> {
        const cardsData = await this.connection.query(
            "select title, estimative from cards where column_id = $1",
            [columnId]
        );
        const cards: Card[] = [];
        for (const cardData of cardsData) {
            cards.push(new Card(cardData.title, cardData.estimative));
        }
        return cards;
    }
}