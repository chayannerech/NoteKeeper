import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArquivarNota, DetalhesNota, EditarNota, InserirNota, ListarNotas, NotaArquivada, NotaEditada, NotaExcluida, NotaInserida } from '../models/nota.models';
import { environment } from '../../../../environments/environment';

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

  selecionarTodos(): Observable<ListarNotas[]> {
    const urlCompleto = `${this.url}?_expand=categoria`;

    return this.http.get<ListarNotas[]>(urlCompleto);
  }

  selecionarPorId(id: number): Observable<DetalhesNota> {
    const urlCompleto = `${this.url}/${id}?_expand=categoria`;
    return this.http.get<DetalhesNota>(urlCompleto);
  }

  arquivar(id: number, notaArquivada: ArquivarNota): Observable<NotaArquivada> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.put<NotaArquivada>(urlCompleto, notaArquivada);
  }
}
