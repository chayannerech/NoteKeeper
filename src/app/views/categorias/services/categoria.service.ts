import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ListarCategorias } from '../models/categoria.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly url = `${environment.API_URL}/categorias`;

  constructor(private http: HttpClient) { }

  selecionarTodos(): Observable<ListarCategorias[]> {
    return this.http.get<ListarCategorias[]>(this.url);
  }
}
