import { NgIf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ArquivarNota, DetalhesNota } from '../models/nota.models';
import { NotaService } from '../services/nota.service';

@Component({
  selector: 'app-arquivar-notas',
  standalone: true,
  imports: [ NgIf, RouterLink, AsyncPipe, MatButtonModule, MatIconModule ],
  templateUrl: './arquivar-notas.component.html'
})

export class ArquivarNotasComponent {
  id?: number;
  nota$?: Observable<DetalhesNota>;
  notaArquivada!: ArquivarNota;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private notaService: NotaService,
    private notificacao: NotificacaoService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (!this.id) {
      return this.notificacao.erro('Não foi possível encontrar o id requisitado');
    }

    this.nota$ = this.notaService.selecionarPorId(this.id);
  }

  arquivar() {
    if (!this.id) {
      return this.notificacao.erro('Não foi possível encontrar o id requisitado');
    }

    this.nota$!.subscribe(nota => {
      this.notaArquivada = {
        ...nota,
        arquivada: true
      };

      this.notaService.arquivar(this.id!, this.notaArquivada).subscribe(() => {
        this.notificacao.sucesso(
          `A nota de ID ${this.id} foi arquivada com sucesso!`
        );

        this.router.navigate(['/notas']);
      });

      this.notificacao.erro('Erro ao carregar a nota.');
    });
  }
}
