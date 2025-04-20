import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';// Обязательно подключаем для ngModel


@NgModule({
  declarations: [AppComponent, TaskComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    CommonModule    // Для директив ngFor, ngIf
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}