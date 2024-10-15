import { ListarCategorias } from "../../categorias/models/categoria.models";

export interface ListarNotas {
  id: number;
  titulo: string;
  conteudo: string;
  categoriaId: number;
  categoria: ListarCategorias;
}
export interface InserirNota {
  titulo: string;
  conteudo: string;
  categoriaId: number;
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
}

export interface NotaExcluida {}
