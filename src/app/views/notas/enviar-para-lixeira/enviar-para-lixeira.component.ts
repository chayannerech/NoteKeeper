import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { DetalhesNota, EnviarNotaParaLixeira } from '../models/nota.models';
import { NotaService } from '../services/nota.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';

@Component({
  selector: 'app-excluir-nota',
  standalone: true,
  imports: [NgIf, RouterLink, AsyncPipe, MatButtonModule, MatIconModule],
  templateUrl: './enviar-para-lixeira.component.html',
})

export class enviarParaLixeiraComponent implements OnInit {
  id?: number;
  nota$?: Observable<DetalhesNota>;
  notaEnviadaParaLixeira!: EnviarNotaParaLixeira;

  constructor (private route: ActivatedRoute, private router: Router, private notaService: NotaService, private notificacao: NotificacaoService ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (!this.id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');
    this.nota$ = this.notaService.selecionarPorId(this.id);
  }

  enviarParaLixeira() {
    if (!this.id) {
      return this.notificacao.erro('Não foi possível encontrar o id requisitado');
    }

    this.nota$!.subscribe(nota => {
      this.notaEnviadaParaLixeira = {
        ...nota,
        naLixeira: true
      };

      this.notaService.enviarParaLixeira(this.id!, this.notaEnviadaParaLixeira).subscribe(() => {
        this.notificacao.sucesso(
          `A nota ${this.notaEnviadaParaLixeira.titulo} foi excluída com sucesso!`
        );

        this.router.navigate(['/notas']);
      });

      this.notificacao.erro('Erro ao carregar a nota.');
    });
  }
}
