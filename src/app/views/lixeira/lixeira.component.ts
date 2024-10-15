import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NotificacaoService } from '../../core/notificacao/notificacao.service';
import { ListarCategorias } from '../categorias/models/categoria.models';
import { CategoriaService } from '../categorias/services/categoria.service';
import { ListarNotas, ArquivarNota, EnviarNotaParaLixeira } from '../notas/models/nota.models';
import { NotaService } from '../notas/services/nota.service';
import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-lixeira',
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
  templateUrl: './lixeira.component.html',
  styleUrl: './lixeira.component.scss'
})

export class LixeiraComponent {
  notas$?: Observable<ListarNotas[]>;
  notaParaRestaurar$?: Observable<ListarNotas>;
  notaRestaurada!: EnviarNotaParaLixeira;
  categorias$?: Observable<ListarCategorias[]>;
  notasEmCache: ListarNotas[];

  constructor(
    private router: Router,
    private notaService: NotaService,
    private categoriaService: CategoriaService,
    private notificacao: NotificacaoService
  ) {
    this.notasEmCache = [];
  }

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.selecionarTodos();
    this.notaService.selecionarTodos().subscribe(notas => {
      this.notasEmCache = notas.filter(n => n.naLixeira);
      this.notas$ = of(this.notasEmCache);

      this.iniciarTemporizadoresDeExclusao();
    });
  }

  filtrar(categoriaId?: number) {
    const notasFiltradas = this.obterNotasFiltradas(this.notasEmCache, categoriaId);
    this.notas$ = of(notasFiltradas);
  }

  private obterNotasFiltradas(notas: ListarNotas[], categoriaId?: number) {
    if (categoriaId)
      return notas.filter(n => n.categoriaId == categoriaId);

    return notas;
  }

  restaurar(id: number) {
    if (!id) {
      return this.notificacao.erro('Não foi possível encontrar o id requisitado');
    }

    this.notaParaRestaurar$ = this.notaService.selecionarPorId(id);

    this.notaParaRestaurar$!.subscribe(nota => {
      this.notaRestaurada = {
        ...nota,
        naLixeira: false
      };

      this.notaService.enviarParaLixeira(id, this.notaRestaurada).subscribe(() => {
        this.notificacao.sucesso(
          `A nota ${this.notaRestaurada.titulo} foi restaurada com sucesso!`
        );

        this.notasEmCache = this.notasEmCache.filter(n => n.id !== id);
        this.router.navigate(['/notas']);
      });

      this.notificacao.erro('Erro ao carregar a nota.');
    });
  }

  private iniciarTemporizadoresDeExclusao() {
    this.notasEmCache.forEach(nota => {
      setTimeout(() => {
        this.excluirAutomaticamente(nota.id);
      }, 10000);
    });
  }

  private excluirAutomaticamente(id: number) {
    this.notaService.excluir(id).subscribe(() => {
      this.notificacao.sucesso(`A nota de ID ${id} foi excluída automaticamente após 10 segundos!`);

      this.notasEmCache = this.notasEmCache.filter(n => n.id !== id);
      this.notas$ = of(this.notasEmCache);
    });
  }
}
