import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api/login/';
  private userId: number | null = null;

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }

  logout(): void {
    sessionStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('access_token');
  }
  getUserId(): number | null {
    if (this.userId === null) {
      const token = sessionStorage.getItem('access_token');
      if (token) {
        const decodedToken = this.decodeToken(token);
        this.userId = decodedToken?.user_id || null; // Извлекаем ID из токена
      }
    }
    return this.userId;
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1]; // Получаем payload токена
    const decoded = atob(payload); // Декодируем base64 строку
    return JSON.parse(decoded); // Преобразуем в объект JSON
  }
}
