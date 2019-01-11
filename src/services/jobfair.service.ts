import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobfairService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  getActiveFair() {
    return this.httpClient.get(`${this.url}/active-fair`).toPromise();
  }

  saveFair(payload) {
    return this.httpClient.post(`${this.url}/jobfairs`, payload)
      .toPromise();
  }
}
