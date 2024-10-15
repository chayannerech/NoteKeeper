import { Routes } from "@angular/router";
import { ListarNotassComponent } from "./listar/listar-nota.component";
import { InserirNotaComponent } from "./inserir/inserir-nota.component";
import { EditarNotaComponent } from "./editar/editar-nota.component";
import { ExcluirNotaComponent } from "./excluir/excluir-nota.component";
import { ArquivarNotasComponent } from "./arquivar/arquivar-notas.component";

export const notasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full'},
  { path: 'listar', component: ListarNotassComponent},
  { path: 'inserir', component: InserirNotaComponent},
  { path: 'editar/:id', component: EditarNotaComponent},
  { path: 'excluir/:id', component: ExcluirNotaComponent},
  { path: 'arquivar/:id', component: ArquivarNotasComponent}
]
