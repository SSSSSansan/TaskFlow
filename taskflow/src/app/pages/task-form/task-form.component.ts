import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Для работы с формами
import { RouterLink } from '@angular/router'; // Для навигации
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StatusService } from '../../services/status.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule], // Подключаем необходимые модули
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  task = { title: '', description: '', status:'', category:'' }; // Объект задачи
  statuses: any[] = [];
  categories: any[] = [];
  selectedStatus: any = null;
  isEditMode = false; // Флаг для режима редактирования

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private statusService: StatusService,
    private categoryService: CategoryService
  ) 
  {
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
  ngOnInit() {
    this.loadStatuses(); 
    this.loadCategories();// Загружаем статусы при инициализации
  }

  loadStatuses() {
    this.statusService.getStatuses().subscribe(data => {
      this.statuses = data;
      this.selectedStatus = this.statuses[0]?.id; // Присваиваем выбранный статус (по умолчанию первый статус)
    });
  }
  loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  saveTask() {
    const taskData = {
      title: this.task.title,
      description: this.task.description,
      user: this.authService.getUserId(),
      status: this.selectedStatus,
      category: this.task.category
    };
  
    this.taskService.createTask(taskData).subscribe(response => {
      console.log('Task created successfully', response);
      this.router.navigate(['/dashboard']); // или другой путь
    }, error => {
      console.error('Error creating task', error);
    });
  }
  
}