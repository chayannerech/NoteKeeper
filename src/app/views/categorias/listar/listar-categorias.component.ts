import { Component } from '@angular/core';
import { ListarCategorias } from '../models/categoria.models';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-listagem-categorias',
  standalone: true,
  imports: [ RouterLink, NgForOf, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule ],
  templateUrl: './listar-categorias.component.html',
  styleUrl: './listar-categorias.component.scss'
})
export class ListarCategoriasComponent {
  categorias: ListarCategorias[];

  constructor() {
    this.categorias = [
      {id: 1, titulo: 'lazer'},
      {id: 2, titulo: 'mercado'}
    ]
  }
}
