import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  ) {}

  ngOnInit() {
  }

  async onSubmit() {
    this.loading = true;

    try {
      await this.authService.login(this.loginForm.value);
      
      this.loading = false;
    } catch (err) {
      this.loading = false;
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
