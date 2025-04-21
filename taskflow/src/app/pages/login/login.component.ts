import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    const credentials = { username: this.username, password: this.password };
    this.authService.login(credentials).subscribe(response => {
      localStorage.setItem('access_token', response.access);
      this.router.navigate(['/dashboard']);
    }, error => {
      console.error('Login failed:', error);
    });
  }
}
