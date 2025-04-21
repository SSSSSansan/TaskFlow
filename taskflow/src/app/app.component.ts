import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Импортируем FormsModule для ngModel
import { HttpClientModule } from '@angular/common/http'; // Импортируем HttpClientModule для работы с API
import { RouterLink, RouterOutlet } from '@angular/router'; // Для маршрутизации

@Component({
  selector: 'app-root',
  standalone: true, // Указываем, что это standalone компонент
  imports: [FormsModule, HttpClientModule, RouterLink, RouterOutlet], // Указываем зависимости
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TaskFlow App'; // Заголовок приложения
}
