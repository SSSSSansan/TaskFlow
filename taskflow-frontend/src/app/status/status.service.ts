import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from './status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private BASE_URL = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.BASE_URL}statuses/`);
  }
}
