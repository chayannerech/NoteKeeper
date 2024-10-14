import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ListarCategoriasComponent } from './views/categorias/listar/listar-categorias.component';
import { InserirCategoriaComponent } from './views/categorias/inserir/inserir-categorias.component';
import { EditarCategoriaComponent } from './views/categorias/editar/editar-categorias.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  {
    path: 'categorias',
    children: [
      { path: '', redirectTo: 'listar', pathMatch: 'full'},
      { path: 'listar', component: ListarCategoriasComponent},
      { path: 'inserir', component: InserirCategoriaComponent},
      { path: 'editar/:id', component: EditarCategoriaComponent}
    ],
  },
];
