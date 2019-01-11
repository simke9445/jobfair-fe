import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('tEst12#@', [Validators.required]),
  });

  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  async onSubmit() {
    this.loading = true;

    try {
      const user = await this.authService.login(this.loginForm.value);
      
      this.loading = false;
    } catch (err) {
      this.loading = false;
    }
  }

  onRegister() {
    this.router.navigate(['/auth/register']);
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
