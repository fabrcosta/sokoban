import { Position } from './position.model';

export class Positions {
    constructor(
        public man: Position,
        public boxes: Position[],
        public target: Position[]
    ) {}
}
