import pgPromise from "pg-promise";
import { Card } from "../domain/entity/Card";
import { CardRepository } from "../domain/repository/CardRepository";

export default class CardService {
    constructor(public cardRepository: CardRepository) { }

    async getCards(columnId: number): Promise<Card[]> {
        return this.cardRepository.findAllByColumnId(columnId);
    }
}