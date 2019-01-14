import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { matchPasswordValidator } from 'src/utils/validators';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  loading = false;
  changePasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      username: ['', Validators.required],
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: '',
    }, {
        validators: matchPasswordValidator,
      });
  }

  get username() {
    return this.changePasswordForm.get('username');
  }

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }

  get password() {
    return this.changePasswordForm.get('password');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }

  async onSubmit() {
    this.loading = true;

    try {
      await this.authService.changePassword(this.changePasswordForm.value);
      this.loading = false;
    } catch (err) {
      console.log(err);
      this.loading = false;
    }

  }
}
