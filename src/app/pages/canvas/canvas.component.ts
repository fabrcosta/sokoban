import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LevelService } from '../../shared/services/level.service';
import { Level } from '../../shared/models/level.model';
import { IMAGES } from './constants';
import { Position } from '../../shared/models/position.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SupabaseService } from '../../shared/services/supabase.service';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent implements OnInit {
  public allLevels!: Level[];

  public currentLevel!: Level;

  public id!: number;
  public rows!: number;
  public columns!: number;
  public board: boolean[][] = [];
  private sub: any;
  public targetMoves!: number;

  public boxesPosition!: Position[];
  public targetsPosition!: Position[];
  public manPosition!: Position;
  public currentMoves: number = 0;
  public hasWon: boolean = false;
  public hasLost: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private levelService: LevelService,
    private supabaseService: SupabaseService,
  ) { }

  public async ngOnInit(): Promise<void> {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.allLevels = this.levelService.getAllLevels();
      this.currentLevel = this.allLevels.filter((x) => x.level == this.id)[0];
      this.rows = this.currentLevel.grid.length;
      this.columns = this.currentLevel.grid[0].length;
      this.manPosition = this.currentLevel.positions.man;
      this.boxesPosition = this.currentLevel.positions.boxes;
      this.targetsPosition = this.currentLevel.positions.target;
      this.targetMoves = this.currentLevel.targetMoves;
      this.setBoard();
    });

    this.supabaseService.getConnection()
      .channel('public:movimentos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'movimentos' }, payload => {
        this.movimentar((payload.new as { direcao: string }).direcao);
      })
      .subscribe();
  }

  public keyEvent(event: KeyboardEvent): void {
    if (event.key === 'w' || event.key === 'W') {
      this.moveUp();
    }
    if (event.key === 's' || event.key === 'S') {
      this.moveDown();
    }
    if (event.key === 'a' || event.key === 'A') {
      this.moveLeft();
    }
    if (event.key === 'd' || event.key === 'D') {
      this.moveRight();
    }
  }

  public movimentar(direcao: string): void {
    console.log('Direção recebida:', direcao);
    if (direcao == "esquerda") {
      this.moveLeft();
    } else if (direcao == "direita") {
      this.moveRight();
    } else if (direcao == "cima") {
      this.moveUp();
    } else if (direcao == "baixo") {
      this.moveDown();
    }
  }

  public navigate(): void {
    if (this.id != this.allLevels.length) {
      var newID: number = this.id + 1;
      var URL: string = window.location.href;

      var final: string = URL.substring(0, URL.length-1) + newID;
      window.location.replace(final);
    }
  }

  public setBoard(): void {
    this.board = [];

    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.board[i][j] = false;
      }
    }
    this.board[0][0] = true;
  }

  public setImage(row: number, col: number): string {
    let returnUrl = "";

    if (this.currentLevel.grid[row][col] == 0) {
      returnUrl = "url(" + IMAGES.FREE + ")";
    }

    if (this.currentLevel.grid[row][col] == 1 || this.currentLevel.grid[row][col] == 2) {
      returnUrl = "url(" + IMAGES.BRICK + ")";
    }

    for (var i = 0; i < this.targetsPosition.length; i++) {
      if (this.targetsPosition[i].row == row && this.targetsPosition[i].col == col) {
        returnUrl = "url(" + IMAGES.CROSS + ")";
      }
    }

    if (this.manPosition.row == row && this.manPosition.col == col) {
      returnUrl = "url(" + IMAGES.AVATAR_RIGHT + ")";
    }

    for (var i = 0; i < this.boxesPosition.length; i++) {
      if (this.boxesPosition[i].row == row && this.boxesPosition[i].col == col) {
        returnUrl = "url(" + IMAGES.BOX_WRONG + ")";

        for (var j = 0; j < this.targetsPosition.length; j++) {
          if (this.boxesPosition[i].row == this.targetsPosition[j].row && this.boxesPosition[i].col == this.targetsPosition[j].col) {
            returnUrl = "url(" + IMAGES.BOX_RIGHT + ")";
            this.checkWinningState();
            break;
          }
        }
      }
    }

    return returnUrl;
  }

  public checkWinningState(): void {
    var boxesPosition: Position[] = this.boxesPosition;
    var targetsPosition: Position[] = this.targetsPosition;

    boxesPosition.sort();
    targetsPosition.sort();

    setTimeout(() => {
      this.hasWon = JSON.stringify(boxesPosition) == JSON.stringify(targetsPosition);
    });
  }

  public moveLeft(): void {
    var nextRow = this.manPosition.row;
    var nextCol = this.manPosition.col - 1;

    if (this.checkBox(nextRow, nextCol) == true) {
      if (this.isBoxPresent(nextRow, nextCol)[0]) {
        if (this.checkBox(nextRow, nextCol - 1) == true && !this.isBoxPresent(nextRow, nextCol - 1)[0]) {
          var index_box = this.isBoxPresent(nextRow, nextCol)[1];
          this.manPosition.col = this.manPosition.col - 1;
          this.boxesPosition[index_box].col = this.boxesPosition[index_box].col - 1;
          this.increaseMoves();
        }
      } else {
        this.manPosition.col = this.manPosition.col - 1;
        this.increaseMoves();
      }
    }
  }

  public moveRight(): void {
    var nextRow = this.manPosition.row;
    var nextCol = this.manPosition.col + 1;

    if (this.checkBox(nextRow, nextCol) == true) {
      if (this.isBoxPresent(nextRow, nextCol)[0]) {
        if (this.checkBox(nextRow, nextCol + 1) == true && !this.isBoxPresent(nextRow, nextCol + 1)[0]) {
          var index_box = this.isBoxPresent(nextRow, nextCol)[1];
          this.manPosition.col = this.manPosition.col + 1;
          this.boxesPosition[index_box].col = this.boxesPosition[index_box].col + 1;
          this.increaseMoves();
        }
      } else {
        this.manPosition.col = this.manPosition.col + 1;
        this.increaseMoves();
      }
    }
  }

  public moveUp(): void {
    var nextRow = this.manPosition.row - 1;
    var nextCol = this.manPosition.col;

    if (this.checkBox(nextRow, nextCol) == true) {
      if (this.isBoxPresent(nextRow, nextCol)[0]) {
        if (this.checkBox(nextRow - 1, nextCol) == true && !this.isBoxPresent(nextRow - 1, nextCol)[0]) {
          var index_box = this.isBoxPresent(nextRow, nextCol)[1];
          this.manPosition.row = this.manPosition.row - 1;
          this.boxesPosition[index_box].row = this.boxesPosition[index_box].row - 1;
          this.increaseMoves();
        }
      } else {
        this.manPosition.row = this.manPosition.row - 1;
        this.increaseMoves();
      }
    }
  }

  public moveDown(): void {
    var nextRow = this.manPosition.row + 1;
    var nextCol = this.manPosition.col;

    if (this.checkBox(nextRow, nextCol) == true) {
      if (this.isBoxPresent(nextRow, nextCol)[0]) {
        if (this.checkBox(nextRow + 1, nextCol) == true &&!this.isBoxPresent(nextRow + 1, nextCol)[0]) {
          var index_box = this.isBoxPresent(nextRow, nextCol)[1];
          this.manPosition.row = this.manPosition.row + 1;
          this.boxesPosition[index_box].row = this.boxesPosition[index_box].row + 1;
          this.increaseMoves();
        }
      } else {
        this.manPosition.row = this.manPosition.row + 1;
        this.increaseMoves();
      }
    }
  }

  public increaseMoves(): void {
    this.currentMoves++;
    if (this.currentMoves > this.targetMoves) {
      this.hasLost = true;
    }
  }

  public checkBox(i: number, j: number): boolean {
    if (i < 0 || j < 0 || i >= this.rows || j >= this.columns) {
      return false;
    }

    if (this.currentLevel.grid[i][j] == 1 || this.currentLevel.grid[i][j] == 2) {
      return false;
    }

    return true;
  }

  public isBoxPresent(row: number, col: number): [boolean, number] {
    for (let i: number = 0; i < this.boxesPosition.length; i++) {
      if (this.boxesPosition[i].row == row && this.boxesPosition[i].col == col) {
        return [true, i];
      }
    }

    return [false, -1];
  }

  public refresh(): void {
    window.location.reload();
  }
}
