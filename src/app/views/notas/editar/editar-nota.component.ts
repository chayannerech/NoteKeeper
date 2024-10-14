import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotaService } from '../services/nota.service';
import { DetalhesNota, EditarNota } from '../models/nota.models';

@Component({
  selector: 'app-editar-notas',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule ],
  templateUrl: './editar-nota.component.html',
})

export class EditarNotaComponent implements OnInit{
  id?: number;
  notaForm: FormGroup;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private notaService: NotaService,
    //private notificacao: NotificacaoService
  ) {
    this.notaForm = new FormGroup({
      titulo: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (!this.id) return console.error('Não foi possível encontrar o id requisitado');
    this.notaService.selecionarPorId(this.id).subscribe((res) => this.trazerValoresParaEdicao(res));
  }

  // get titulo() {
  //   return this.notaForm.get('titulo');
  // }

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
  }
}
