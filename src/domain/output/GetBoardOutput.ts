import { ColumnOutput } from "./ColumnOutput"

export type GetBoardOutput = {
    name: string,
    estimative: number,
    columns: ColumnOutput[]
}