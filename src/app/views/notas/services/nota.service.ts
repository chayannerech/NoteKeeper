import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalhesNota, EditarNota, InserirNota, ListarNota, NotaEditada, NotaExcluida, NotaInserida } from '../models/nota.models';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private readonly url = `${environment.API_URL}/notas`;

  constructor(private http: HttpClient) { }

  cadastrar(novaNota: InserirNota): Observable<NotaInserida> {
    return this.http.post<NotaInserida>(this.url, novaNota);
  }

  editar(id: number, NotaEditada: EditarNota): Observable<NotaEditada> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.put<NotaEditada>(urlCompleto, NotaEditada);
  }

  excluir(id: number): Observable<NotaExcluida> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.delete<NotaExcluida>(urlCompleto);
  }

  selecionarTodos(): Observable<ListarNota[]> {
    const urlCompleto = `${this.url}?_expand=categoria`;

    return this.http.get<ListarNota[]>(urlCompleto);
  }

  selecionarPorId(id: number): Observable<DetalhesNota> {
    const urlCompleto = `${this.url}/${id}?_expand=categoria`;
    return this.http.get<DetalhesNota>(urlCompleto);
  }
}
