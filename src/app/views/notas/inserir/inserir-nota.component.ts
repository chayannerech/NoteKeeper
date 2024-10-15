import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NotaService } from '../services/nota.service';
import { InserirNota } from '../models/nota.models';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Observable } from 'rxjs';
import { ListarCategorias } from '../../categorias/models/categoria.models';
import { CategoriaService } from '../../categorias/services/categoria.service';
import { MatCardModule } from '@angular/material/card';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';

@Component({
  selector: 'app-inserir-Notas',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    RouterLink,
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './inserir-nota.component.html'
})

export class InserirNotaComponent implements OnInit {
  notaForm: FormGroup;
  categorias$?: Observable<ListarCategorias[]>;

  constructor(
    private router: Router,
    private notaService: NotaService,
    private categoriaService: CategoriaService,
    private notificacao: NotificacaoService
  ) {
    this.notaForm = new FormGroup({
      titulo: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      conteudo: new FormControl<string>(''),
      categoriaId: new FormControl<number>(0, [
        Validators.min(1)
      ]),
    });
  }

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.selecionarTodos();
  }

  get titulo() {
    return this.notaForm.get('titulo');
  }

  get categoriaId() {
    return this.notaForm.get('categoriaId');
  }

  cadastrar() {
    if (this.notaForm.invalid) return;

    const novaNota: InserirNota = this.notaForm.value;
    novaNota.arquivada = false;

    this.notaService.cadastrar(novaNota).subscribe((res) => {
      this.notificacao.sucesso(
        `A nota ${res.titulo} foi cadastrada com sucesso!`
      );

      this.router.navigate(['/notas']);
    });
  }

  campoNaoFoiPreenchido(campo: string): boolean {
    const controle = this.notaForm.get(campo);
    if (!controle) return false;
    return controle.pristine;
  }

  mapearTituloDaCategoria(id: number,categorias: ListarCategorias[]) {
    const categoria = categorias.find((categoria) => categoria.id === id);
    return categoria ? categoria.titulo : 'Categoria não encontrada';
  }
}
