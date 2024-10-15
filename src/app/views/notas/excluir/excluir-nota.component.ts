import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { DetalhesNota } from '../models/nota.models';
import { NotaService } from '../services/nota.service';

@Component({
  selector: 'app-excluir-nota',
  standalone: true,
  imports: [NgIf, RouterLink, AsyncPipe, MatButtonModule, MatIconModule],
  templateUrl: './excluir-nota.component.html',
})

export class ExcluirNotaComponent implements OnInit {
  id?: number;
  nota$?: Observable<DetalhesNota>;

  constructor (private route: ActivatedRoute, private router: Router, private notaService: NotaService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (!this.id) return console.error('Não foi possível encontrar o id requisitado');
    this.nota$ = this.notaService.selecionarPorId(this.id);
  }

  excluir() {
    if (!this.id) return console.error('Não foi possível encontrar o id requisitado');

    this.notaService
      .excluir(this.id)
      .subscribe((res) => {
        // this.notificacao.sucesso(
        //   `O registro ID [${res.id}] foi cadastrado com sucesso!`
        // );

        this.router.navigate(['/notas']);
      });
  }
}
