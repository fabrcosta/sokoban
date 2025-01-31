import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss'
})
export class ControlComponent implements OnInit {
  private supabase: any;
  constructor(
    private supabaseService: SupabaseService,
  ) { }

  public ngOnInit(): void {
    this.supabase = this.supabaseService.getConnection();
  }

  private async movimentar(direcao: string): Promise<void> {
    await this.supabase
      .from('movimentos')
      .insert([{direcao}])
      .then(() => {
        console.log('Movimento inserido com sucesso');
      })
      .catch((error: any) => {
        console.error('Erro ao inserir movimento', error);
      });
  }

  public moveLeft(): void {
    this.movimentar('esquerda');
  }

  public moveRight(): void {
    this.movimentar('direita');
  }

  public moveUp(): void {
    this.movimentar('cima');
  }

  public moveDown(): void {
    this.movimentar('baixo');
  }

}
