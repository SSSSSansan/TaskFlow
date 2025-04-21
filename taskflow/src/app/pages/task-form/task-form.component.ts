import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Для работы с формами
import { RouterLink } from '@angular/router'; // Для навигации

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule], // Подключаем необходимые модули
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  task = { title: '', description: '' }; // Объект задачи
  isEditMode = false; // Флаг для режима редактирования

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute // Для получения параметров маршрута
  ) {
    const taskId = this.route.snapshot.paramMap.get('id'); // Получаем id из URL
    if (taskId) {
      this.isEditMode = true;
      this.loadTask(taskId); // Загружаем задачу для редактирования
    }
  }

  loadTask(id: string) {
    this.taskService.getTask(id).subscribe((task) => {
      this.task = task;
    });
  }

  saveTask() {
    if (this.isEditMode) {
      this.taskService.updateTask(this.task).subscribe();
    } else {
      this.taskService.createTask(this.task).subscribe();
    }
  }
}
