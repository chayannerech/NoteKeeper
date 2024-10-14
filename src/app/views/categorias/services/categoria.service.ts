import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CategoriaCriada, InserirCategoria, ListarCategorias } from '../models/categoria.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly url = `${environment.API_URL}/categorias`;

  constructor(private http: HttpClient) { }


  cadastrar(novaCategoria: InserirCategoria): Observable<CategoriaCriada> {
    return this.http.post<CategoriaCriada>(this.url, novaCategoria);
  }

  selecionarTodos(): Observable<ListarCategorias[]> {
    return this.http.get<ListarCategorias[]>(this.url);
  }
}
