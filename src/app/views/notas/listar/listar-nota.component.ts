import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable, of } from 'rxjs';
import { ListarNotas } from '../models/nota.models';
import { NotaService } from '../services/nota.service';
import { MatChipsModule } from '@angular/material/chips';
import { CategoriaService } from '../../categorias/services/categoria.service';
import { ListarCategorias } from '../../categorias/models/categoria.models';

@Component({
  selector: 'app-listar-notas',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule
  ],
  templateUrl: './listar-nota.component.html',
  styleUrl: './listar-nota.component.scss'
})

export class ListarNotassComponent implements OnInit {
  notas$?: Observable<ListarNotas[]>;
  categorias$?: Observable<ListarCategorias[]>;
  notasEmCache: ListarNotas[];

  constructor( private notaService: NotaService, private categoriaService: CategoriaService ) {
    this.notasEmCache = [];
  }

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.selecionarTodos();
    this.notaService.selecionarTodos().subscribe(notas => {
      this.notasEmCache = notas.filter(n => !n.arquivada && !n.naLixeira);
      this.notas$ = of(notas.filter(n => !n.arquivada && !n.naLixeira));
    });
  }

  filtrar(categoriaId?: number) {
    const notasFiltradas = this.obterNotasFiltradas(this.notasEmCache, categoriaId);

    this.notas$ = of(notasFiltradas);
  }

  private obterNotasFiltradas(notas: ListarNotas[], categoriaId?: number) {
    if (categoriaId)
      return notas.filter(n => n.categoriaId == categoriaId)

    return notas;
  }
}
