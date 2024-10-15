import { ListarCategorias } from "../../categorias/models/categoria.models";

export interface ListarNotas {
  id: number;
  titulo: string;
  conteudo: string;
  categoriaId: number;
  categoria: ListarCategorias;
  arquivada: boolean;
  naLixeira: boolean
}
export interface InserirNota {
  titulo: string;
  conteudo: string;
  categoriaId: number;
  arquivada: boolean;
  naLixeira: boolean
}
export interface NotaInserida {
  id: number;
  titulo: string;
  conteudo: string;
  categoriaId: number;
}
export interface EditarNota {
  titulo: string;
  conteudo: string;
  categoriaId: number;
}
export interface NotaEditada {
  id: number;
  titulo: string;
  conteudo: string;
  categoriaId: number;
}
export interface DetalhesNota {
  id: number;
  titulo: string;
  conteudo: string;
  categoriaId: number;
  categoria: ListarCategorias;
  arquivada: boolean;
  naLixeira: boolean
}
export interface ArquivarNota {
  id: number;
  titulo: string;
  conteudo: string;
  categoriaId: number;
  categoria: ListarCategorias;
  arquivada: boolean;
}
export interface NotaArquivada {
  id: number;
  titulo: string;
  conteudo: string;
  categoriaId: number;
  naLixeira: boolean
}
export interface EnviarNotaParaLixeira {
  id: number;
  titulo: string;
  conteudo: string;
  categoriaId: number;
  categoria: ListarCategorias;
  naLixeira: boolean
}
export interface NotaEnviadaParaLixeira {
  id: number;
  titulo: string;
  conteudo: string;
  categoriaId: number;
  categoria: ListarCategorias;
}

export interface NotaExcluida {}
