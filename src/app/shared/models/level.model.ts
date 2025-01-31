import { Positions } from './positions.model';

export class Level {
    constructor(
        public level: number,
        public targetMoves: number,
        public positions: Positions,
        public grid: number[][]
    ) {}
}
