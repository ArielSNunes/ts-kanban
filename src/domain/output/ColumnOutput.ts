import { CardOutput } from "./CardOutput"

export type ColumnOutput = {
    name: string,
    estimative: number,
    hasEstimative: boolean,
    cards: CardOutput[]
}