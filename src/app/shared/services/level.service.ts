import { Injectable } from "@angular/core";
import { Level } from "../models/level.model";
import { Positions } from "../models/positions.model";
import { Position } from "../models/position.model";

@Injectable({
  providedIn: "root",
})
export class LevelService {

  private allLevels: Level[] = [
    new Level(
      1,
      9,
      new Positions(
        new Position(2, 3),
        [new Position(2, 2), new Position(3, 2)],
        [new Position(1, 2), new Position(3, 1)]
      ),
      [
        [2, 1, 1, 1, 2],
        [2, 1, 0, 1, 1],
        [1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
      ]
    ),
    new Level(
      2,
      29,
      new Positions(
        new Position(1, 3),
        [new Position(2, 3), new Position(3, 4)],
        [new Position(3, 1), new Position(3, 5)]
      ),
      [
        [2, 2, 1, 1, 1, 1, 1],
        [2, 1, 1, 0, 0, 0, 1],
        [1, 1, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ]
    ),
    new Level(
      3,
      39,
      new Positions(
        new Position(1, 3),
        [new Position(2, 3), new Position(3, 2)],
        [new Position(3, 4), new Position(4, 4)]
      ),
      [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1]
      ]
    ),
    new Level(
      4,
      19,
      new Positions(
        new Position(3, 3),
        [new Position(2, 3), new Position(2, 2)],
        [new Position(2, 4), new Position(1, 3)]
      ),
      [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1]
      ]
    ),
    new Level(
      5,
      39,
      new Positions(
        new Position(5, 4),
        [new Position(4, 3), new Position(3, 3)],
        [new Position(3, 2), new Position(1, 2)]
      ),
      [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 1],
        [1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1]
      ]
    ),
    new Level(
      6,
      29,
      new Positions(
        new Position(5, 5),
        [new Position(4, 4), new Position(3, 4)],
        [new Position(3, 2), new Position(1, 2)]
      ),
      [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ]
    )
  ];

  constructor() { }

  public getAllLevels(): Level[] {
    return this.allLevels;
  }
}
