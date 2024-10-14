import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CategoriaEditada, CategoriaInserida, DetalhesCategoria, EditarCategoria, InserirCategoria, ListarCategorias } from '../models/categoria.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly url = `${environment.API_URL}/categorias`;

  constructor(private http: HttpClient) { }

  cadastrar(novaCategoria: InserirCategoria): Observable<CategoriaInserida> {
    return this.http.post<CategoriaInserida>(this.url, novaCategoria);
  }

  editar(id: number, categoriaEditada: EditarCategoria): Observable<CategoriaEditada> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.put<CategoriaEditada>(urlCompleto, categoriaEditada);
  }

  selecionarTodos(): Observable<ListarCategorias[]> {
    return this.http.get<ListarCategorias[]>(this.url);
  }

  selecionarPorId(id: number) {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.get<DetalhesCategoria>(urlCompleto);
  }
}
