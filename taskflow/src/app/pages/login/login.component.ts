import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    const credentials = { username: this.username, password: this.password };
    console.log('Login credentials:', credentials);
    this.authService.login(credentials).subscribe(
      response => {
        if (response.access){
          sessionStorage.setItem('access_token', response.access);
          this.router.navigate(['/dashboard']);}
        else{
          console.error('No token received');
        }
    }, error => {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    });
  }
}
