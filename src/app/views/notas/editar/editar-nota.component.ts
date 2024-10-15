import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotaService } from '../services/nota.service';
import { DetalhesNota, EditarNota } from '../models/nota.models';
import { NgIf, NgForOf, NgSwitch, NgSwitchCase, AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { ListarCategorias } from '../../categorias/models/categoria.models';
import { CategoriaService } from '../../categorias/services/categoria.service';

@Component({
  selector: 'app-editar-notas',
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
  templateUrl: './editar-nota.component.html',
})

export class EditarNotaComponent implements OnInit{
  id?: number;
  notaForm: FormGroup;
  categorias$?: Observable<ListarCategorias[]>;


  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private notaService: NotaService,
    private categoriaService: CategoriaService
    //private notificacao: NotificacaoService
  ) {
    this.notaForm = new FormGroup({
      titulo: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      conteudo: new FormControl<string>(''),
      categoriaId: new FormControl<number>(0),
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.categorias$ = this.categoriaService.selecionarTodos();

    if (!this.id) return console.error('Não foi possível encontrar o id requisitado');
    this.notaService.selecionarPorId(this.id).subscribe((res) => this.trazerValoresParaEdicao(res));
  }

  get titulo() {
    return this.notaForm.get('titulo');
  }

  editar() {
    if (this.notaForm.invalid) return;
    if (!this.id) return console.error('Não foi possível encontrar o id requisitado');

    const notaEditada: EditarNota = this.notaForm.value;

    this.notaService.editar(this.id, notaEditada).subscribe((res) => {
      // this.notificacao.sucesso(
      //   `O registro ID [${res.id}] foi cadastrado com sucesso!`
      // );

      this.router.navigate(['/notas']);
    });
  }

  private trazerValoresParaEdicao(notaSelecionada: DetalhesNota) {
    this.notaForm.patchValue(notaSelecionada);
    const campos = Object.keys(this.notaForm.controls);

    for (let campo of campos) {
      const controle = this.notaForm.get(campo)

      controle?.markAsDirty();
    }
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
