import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private BASE_URL = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.BASE_URL}tasks/`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.BASE_URL}tasks/`, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.BASE_URL}tasks/${id}/`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}tasks/${id}/`);
  }
}
