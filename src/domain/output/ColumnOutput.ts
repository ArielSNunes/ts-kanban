import { CardOutput } from "./CardOutput"

export type ColumnOutput = {
    id: number,
    name: string,
    estimative: number,
    hasEstimative: boolean,
    cards: CardOutput[]
}