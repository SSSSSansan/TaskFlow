import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StatusService } from '../../services/status.service';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule], // Подключаем необходимые модули
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  task = { title: '', description: '', status: '', category: '', id: null }; // Объект задачи
  statuses: any[] = [];
  categories: any[] = [];
  selectedStatus: number | null = null;
  selectedCategory: number | null = null;
  isEditMode = false; // Флаг для режима редактирования

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private statusService: StatusService,
    private categoryService: CategoryService
  ) {
    const taskId = this.route.snapshot.paramMap.get('id'); // Получаем id из URL
    if (taskId) {
      this.isEditMode = true;
      this.loadTask(taskId); // Загружаем задачу для редактирования
    }
  }

  ngOnInit() {
    this.loadStatuses();
    this.loadCategories(); // Загружаем статусы и категории при инициализации
  }

  loadStatuses() {
    this.statusService.getStatuses().subscribe(data => {
      this.statuses = data;
      this.selectedStatus = this.selectedStatus || this.statuses[0]?.id; // Присваиваем выбранный статус (по умолчанию первый статус)
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.selectedCategory = this.selectedCategory || this.categories[0]?.id; // Присваиваем выбранную категорию (по умолчанию первая категория)
    });
  }

  loadTask(id: string) {
    this.taskService.getTask(id).subscribe((task) => {
      this.task = task;
      this.selectedStatus = task.status?.id ?? null; // Присваиваем выбранный статус
      this.selectedCategory = task.category?.id ?? null; // Присваиваем выбранную категорию
    });
  }

  saveTask() {
    const taskData = {
      title: this.task.title,
      description: this.task.description,
      user: this.authService.getUserId(),
      status: this.selectedStatus,
      category: this.selectedCategory // Используем selectedCategory
    };

    const taskObservable = this.isEditMode && this.task.id
      ? this.taskService.updateTask(this.task.id as string, taskData) // Обновляем задачу
      : this.taskService.createTask(taskData); // Создаем новую задачу

      taskObservable.subscribe({
        next: (response: any) => {
          console.log('Task saved successfully', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          console.error('Error saving task', error);
        }
      });
  }
  
}
