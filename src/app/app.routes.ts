import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', loadComponent: () => import('./main/main.page').then(m => m.MainPage) },
  {
    path: 'task-list',
    loadComponent: () => import('./task-list/task-list.page').then(m => m.TaskListPage)
  },
  {
    path: 'task-form',
    loadComponent: () => import('./task-form/task-form.page').then( m => m.TaskFormPage)
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }