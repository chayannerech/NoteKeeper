import { Component, OnInit } from '@angular/core';
import { ListarCategorias } from '../models/categoria.models';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-listagem-categorias',
  standalone: true,
  imports: [ RouterLink, NgForOf, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule ],
  templateUrl: './listar-categorias.component.html',
  styleUrl: './listar-categorias.component.scss'
})
export class ListarCategoriasComponent implements OnInit {
  categorias: ListarCategorias[];

  constructor( private categoriaService: CategoriaService ) {
    this.categorias = []
  }

  ngOnInit(): void {
    this.categoriaService.selecionarTodos().subscribe(res => {
      this.categorias = res;
    });
  }
}
