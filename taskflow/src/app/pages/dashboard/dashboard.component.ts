import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // ⬅️ ВАЖНО

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink], // ⬅️ Добавь CommonModule
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  tasks: any[] = []; // Добавь тип any[] для безопасности

  constructor(private taskService: TaskService) {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data: any[]) => {
      this.tasks = data;
    });
  }
}
