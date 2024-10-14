import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { DetalhesCategoria } from '../models/categoria.models';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-excluir-categorias',
  standalone: true,
  imports: [NgIf, RouterLink, AsyncPipe, MatButtonModule, MatIconModule],
  templateUrl: './excluir-categorias.component.html',
})

export class ExcluirCategoriasComponent implements OnInit {
  id?: number;
  categoria$?: Observable<DetalhesCategoria>;

  constructor (private route: ActivatedRoute, private router: Router, private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (!this.id) return console.error('Não foi possível encontrar o id requisitado');
    this.categoria$ = this.categoriaService.selecionarPorId(this.id);
  }

  excluir() {
    if (!this.id) return console.error('Não foi possível encontrar o id requisitado');

    this.categoriaService
      .excluir(this.id)
      .subscribe((res) => {
        // this.notificacao.sucesso(
        //   `O registro ID [${res.id}] foi cadastrado com sucesso!`
        // );

        this.router.navigate(['/categorias']);
      });
  }
}
