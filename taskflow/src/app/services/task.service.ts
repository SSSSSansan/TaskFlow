import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8000/api/tasks/'; // URL для API

  constructor(private http: HttpClient) {}

  getTask(id: string): Observable<any> {
    return this.http.get(`http://localhost:8000/api/tasks/${id}/`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    });
  }
  

  getTasks(): Observable<any> {
    return this.http.get('http://localhost:8000/api/tasks/', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    });
  }
  

  createTask(task: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/tasks/', task, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    });
  }
  
  
  updateTask(id: string, taskData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/${id}/`, taskData); // Не забывайте передавать ID
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
