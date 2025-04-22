import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api/login/';

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
}
