import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

import { passwordValidator } from 'src/utils/validators';
import { AuthService } from 'src/services/auth.service';
import { bussinessAreas } from 'src/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('tEst12#@', [passwordValidator, Validators.minLength(8), Validators.maxLength(12)]),
    type: new FormControl('student'),
  });

  studentForm = new FormGroup({
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    yearOfStudy: new FormControl(null, []),
    hasGraduated: new FormControl(false, []),
    profileImage: new FormControl('', [Validators.required]),
  });

  companyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    director: new FormControl(''),
    pib: new FormControl('', [Validators.required]),
    numberOfEmployees: new FormControl('', []),
    email: new FormControl('', [Validators.email]),
    website: new FormControl(''),
    bussinessArea: new FormControl('', [Validators.required]),
    specialization: new FormControl(''),
    logoImage: new FormControl(null, [Validators.required]),
  });

  bussinessAreas = bussinessAreas;

  imageOptions = {
    maxWidth: 300,
    minWidth: 100,
    maxHeight: 300,
    minHeight: 100,
    accept: 'image/png,image/jpeg',
  };

  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  async onSubmit(stepper: MatStepper) {
    const isStudent = this.registerForm.value.type === 'student';
    const payload = {
      ...this.registerForm.value,
      ...(isStudent ? this.studentForm.value : this.companyForm.value),
    };

    try {
      this.loading = true;

      const { profileImage, logoImage, ...fieldPayload } = payload;

      await this.authService.register(fieldPayload, isStudent ? profileImage : logoImage);

      this.loading = false;
    } catch (err) {
      this.loading = false;
    }
  }

  onNext(stepper: MatStepper) {
    switch (this.registerForm.value.type) {
      case 'student':
        stepper.selectedIndex = 2;
        break;
      case 'company':
        stepper.selectedIndex = 1;
        break;
      default:
        break;
    }
  }

  onLogoReady(event) {
    this.companyForm.patchValue({
      logoImage: event,
    });
  }

  onProfileReady(event) {
    this.studentForm.patchValue({
      profileImage: event,
    });
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
