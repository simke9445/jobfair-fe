import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobfairService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  async getActiveFair() {
    const params = new HttpParams()
      .set('status', 'active');

    let [jobFair] = await this.httpClient.get<any[]>(`${this.url}/jobfairs`, {
      params,
    }).toPromise();

    if (jobFair) {
      jobFair = await this.httpClient.get(`${this.url}/jobfairs/${jobFair._id}`)
        .toPromise();
    }

    return jobFair;
  }

  saveFair(payload) {
    return this.httpClient.post(`${this.url}/jobfairs`, payload)
      .toPromise();
  }

  updateFair(payload, id) {
    return this.httpClient.patch(`${this.url}/jobfairs/${id}`, payload)
      .toPromise();
  }

  saveFairApplication(payload, fairId) {
    return this.httpClient.post(`${this.url}/jobfairs/${fairId}/applications`, payload)
      .toPromise();
  }

  updateFairApplication(payload, fairId, id) {
    return this.httpClient.patch(`${this.url}/jobfairs/${fairId}/applications/${id}`, payload)
      .toPromise();
  }
}
