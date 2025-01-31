import { Component } from '@angular/core';
import { LevelsComponent } from '../levels/levels.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  standalone: true,
  imports: [
    FlexLayoutModule,
    LevelsComponent,
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
