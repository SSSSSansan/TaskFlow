import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { CategoryService } from '../category/category.service';
import { StatusService } from '../status/status.service';
import { Category } from '../category/category.model';
import { Status } from '../status/status.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: []
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];
  statuses: Status[] = [];

  // Определяем переменные для ngModel
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  newTaskCategory: string = '';
  newTaskStatus: string = '';
  
  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private statusService: StatusService
  ) {}

  ngOnInit() {
    this.loadTasks();
    this.loadCategories();
    this.loadStatuses();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  loadStatuses() {
    this.statusService.getStatuses().subscribe((statuses) => {
      this.statuses = statuses;
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  createTask() {
    // Создаем новую задачу, используя данные из модели
    const newTask: Task = {
      id: 0,  // Значение по умолчанию
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      category: this.newTaskCategory,
      status: this.newTaskStatus,
      dueDate: '',  // Добавьте свойство по необходимости
      createdAt: new Date().toISOString()  // Устанавливаем текущую дату
    };
    this.taskService.createTask(newTask).subscribe(() => {
      this.loadTasks();
      // Очистить поля после добавления
      this.newTaskTitle = '';
      this.newTaskDescription = '';
      this.newTaskCategory = '';
      this.newTaskStatus = '';
    });
  }

  updateTask(id: number, task: Task) {
    this.taskService.updateTask(id, task).subscribe(() => {
      this.loadTasks();
    });
  }
}
