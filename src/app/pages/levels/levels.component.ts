import { Component } from '@angular/core';
import { LevelService } from '../../shared/services/level.service';
import { Level } from '../../shared/models/level.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
  ],
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.scss'
})
export class LevelsComponent {
  public allLevels: Level[];

  constructor(private levelService: LevelService) {
    this.allLevels = this.levelService.getAllLevels();
  }
}
