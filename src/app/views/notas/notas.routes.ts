import { Routes } from "@angular/router";
import { ListarNotasComponent } from "./listar/listar-nota.component";
import { InserirNotaComponent } from "./inserir/inserir-nota.component";
import { EditarNotaComponent } from "./editar/editar-nota.component";
import { ExcluirNotaComponent } from "./excluir/excluir-nota.component";

export const notasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full'},
  { path: 'listar', component: ListarNotasComponent},
  { path: 'inserir', component: InserirNotaComponent},
  { path: 'editar/:id', component: EditarNotaComponent},
  { path: 'excluir/:id', component: ExcluirNotaComponent}
]
