import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CanvasComponent } from './pages/canvas/canvas.component';
import { ControlComponent } from './pages/control/control.component';

export const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: 'level/:id',
    component: CanvasComponent
  },
  {
    path: 'control',
    component: ControlComponent
  },
  {
    path: '**',
    redirectTo: "home",
    pathMatch: "full",
  },
];
