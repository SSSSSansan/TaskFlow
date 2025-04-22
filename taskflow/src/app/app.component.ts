import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Импортируем FormsModule для ngModel
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, // Указываем, что это standalone компонент
  imports: [FormsModule, RouterModule, CommonModule], // Указываем зависимости
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TaskFlow App'; // Заголовок приложения
}
