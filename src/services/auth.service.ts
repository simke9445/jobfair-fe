import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/services/localStorage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiUrl;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private toastrService: ToastrService,
  ) { }

  login(payload) {
    return this.http.post(`${this.url}/auth/login`, payload)
      .toPromise()
      .then((user: any) => {
        console.log(user);

        this.localStorageService.set('token', user.token);
        this.localStorageService.set('role', user.role);
        this.localStorageService.set('id', user.id);

        return this.router.navigate(['/main']);
      });
  }

  register(payload) {
    return this.http.post(`${this.url}/auth/register`, payload)
      .toPromise()
      .then(() => {
        this.toastrService.success('Account created successfully!');
        return this.router.navigate(['/auth/login']);
      });
  }

  changePassword(payload) {
    return this.http.post(`${this.url}/auth/changePassword`, payload)
      .toPromise()
      .then(() => {
        this.toastrService.success('Password changed successfully!');
        return this.router.navigate(['/auth/login']);
      });
  }

  logout() {
    this.localStorageService.clear();
    this.router.navigate(['/']);
  }
}
