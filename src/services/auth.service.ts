import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/services/localStorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiUrl;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
  ) { }

  login(payload) {
    return this.http.post(`${this.url}/auth/login`, payload)
      .toPromise()
      .then((user: any) => {
        this.localStorageService.set('token', user.token);
        this.localStorageService.set('type', user.type);
        this.localStorageService.set('id', user.id);

        return this.router.navigate(['/main']);
      });
  }

  register(payload) {
    return this.http.post(`${this.url}/auth/register`, payload)
      .toPromise()
      .then(() => {
        return this.router.navigate(['/auth/login']);
      });
  }

  changePassword() {

  }
}
