import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ArquivarNota, DetalhesNota, EditarNota, EnviarNotaParaLixeira, InserirNota, ListarNotas, NotaArquivada, NotaEditada, NotaEnviadaParaLixeira, NotaExcluida, NotaInserida } from '../models/nota.models';
import { environment } from '../../../../environments/environment';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';

@Injectable({
  providedIn: 'root'
})

export class NotaService {
  private readonly url = `${environment.API_URL}/notas`;
  private notasNaLixeira: { [id: number]: number } = {};
  private tempoRestante: { [id: number]: number } = {};

  constructor(private http: HttpClient, private notificacao: NotificacaoService) {
    this.carregarEstado();
  }

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

  enviarParaLixeira(id: number, nota: EnviarNotaParaLixeira): Observable<any> {
    const urlCompleto = `${this.url}/${id}`;
    this.iniciarTemporizadorDeExclusao(id);

    return this.http.put<NotaEnviadaParaLixeira>(urlCompleto, nota);
  }

  private iniciarTemporizadorDeExclusao(id: number) {
    if (this.notasNaLixeira[id]) clearTimeout(this.notasNaLixeira[id]);

    const tempoParaExclusao = 600000;
    const tempoRestante = this.tempoRestante[id] ?? tempoParaExclusao;
    const inicio = Date.now();

    this.notasNaLixeira[id] = window.setTimeout(() => {
      this.excluirNotaDaLixeira(id);
    }, tempoRestante);

    this.salvarEstado(id, tempoRestante, inicio);
  }

  private excluirNotaDaLixeira(id: number) {
    this.excluir(id).subscribe(() => {
      delete this.notasNaLixeira[id];
      delete this.tempoRestante[id];
      this.removerEstado(id);
    });
  }

  private salvarEstado(id: number, tempoRestante: number, inicio: number) {
    const estado = {
      id,
      tempoRestante: tempoRestante,
      inicio
    };

    localStorage.setItem(`nota-${id}`, JSON.stringify(estado));
  }

  private carregarEstado() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('nota-')) {
        const estado = JSON.parse(localStorage.getItem(key)!);

        const agora = Date.now();
        const tempoPassado = agora - estado.inicio;
        const tempoRestante = estado.tempoRestante - tempoPassado;

        if (tempoRestante > 0) {
          this.tempoRestante[estado.id] = tempoRestante;
          this.iniciarTemporizadorDeExclusao(estado.id);
        } else {
          this.excluirNotaDaLixeira(estado.id);
        }
      }
    }
  }

  private removerEstado(id: number) {
    localStorage.removeItem(`nota-${id}`);
  }
}
