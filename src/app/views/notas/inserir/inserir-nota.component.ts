import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NotaService } from '../services/nota.service';
import { InserirNota } from '../models/nota.models';

@Component({
  selector: 'app-inserir-Notas',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule ],
  templateUrl: './inserir-nota.component.html'
})

export class InserirNotaComponent {
  notaForm: FormGroup;

  constructor(
    private router: Router,
    private NotaService: NotaService,
    //private notificacao: NotificacaoService
  ) {
    this.notaForm = new FormGroup({
      titulo: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  // get titulo() {
  //   return this.NotaForm.get('titulo');
  // }

  cadastrar() {
    if (this.notaForm.invalid) return;

    const novaNota: InserirNota = this.notaForm.value;

    this.NotaService.cadastrar(novaNota).subscribe((res) => {
      // this.notificacao.sucesso(
      //   `O registro ID [${res.id}] foi cadastrado com sucesso!`
      // );

      this.router.navigate(['/notas']);
    });
  }
}
