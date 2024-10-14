import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ItemDashboard } from './models/item-dash-model';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ RouterLink, NgForOf, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  itens: ItemDashboard[] = [
    {
      titulo: 'Categorias',
      descricao: 'Gerencie as categorias utilizadas para organizar as notas',
      rota: '/categorias',
      //icone: 'bookmark',
    },
    {
      titulo: 'Notas',
      descricao:
        'Gerencie as tarefas do dia-a-dia com notas organizáveis',
      rota: '/notas',
      //icone: 'collections_bookmark',
    },
  ]
}
