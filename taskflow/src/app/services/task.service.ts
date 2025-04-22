import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8000/api/tasks/'; // URL для API

  constructor(private http: HttpClient) {}
 
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTask(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    });
  }
  

  updateTask(taskId: number, taskData: any): Observable<any> {
    return this.http.put(`/api/tasks/${taskId}/`, taskData);
  }  

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
