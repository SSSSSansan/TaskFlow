import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  tasksInPlans: any[] = [];
  tasksInProgress: any[] = [];
  tasksCompleted: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks: any[]) => {
      this.tasksInPlans = tasks.filter((task) => task.status && task.status.name === 'В планах');
      this.tasksInProgress = tasks.filter((task) => task.status && task.status.name === 'В процессе');
      this.tasksCompleted = tasks.filter((task) => task.status && task.status.name === 'Готово');
    });
  }
  
  
}
