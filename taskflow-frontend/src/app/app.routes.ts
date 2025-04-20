import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';

export const routes: Routes = [
  { path: '', component: TaskComponent },
  { path: 'tasks', component: TaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Используем forRoot для определения маршрутов
  exports: [RouterModule]
})
export class AppRoutingModule {}
