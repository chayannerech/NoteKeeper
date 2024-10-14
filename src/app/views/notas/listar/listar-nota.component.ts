import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { ListarNota } from '../models/nota.models';
import { NotaService } from '../services/nota.service';

@Component({
  selector: 'app-listar-notas',
  standalone: true,
  imports: [ RouterLink, NgForOf, NgIf, AsyncPipe, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule ],
  templateUrl: './listar-nota.component.html',
  styleUrl: './listar-nota.component.scss'
})

export class ListarNotasComponent implements OnInit {
  notas$?: Observable<ListarNota[]>;

  constructor( private notaService: NotaService ) {}

  ngOnInit(): void {
    this.notas$ = this.notaService.selecionarTodos();
  }
}
