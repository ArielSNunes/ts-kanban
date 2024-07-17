import { ColumnOutput } from "./ColumnOutput"

export type GetBoardOutput = {
    id: number,
    name: string,
    estimative: number,
    columns: ColumnOutput[]
}