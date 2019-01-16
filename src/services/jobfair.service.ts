import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { JobFair } from 'src/models/jobfair';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JobfairService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private router: Router,
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

  saveFair(payload, logoImage) {
    return this.httpClient.post(`${this.url}/jobfairs`, payload)
      .toPromise()
      .then((jobFair: JobFair) => {
        const formData = new FormData();
        formData.append('logoImage', logoImage);

        return this.httpClient.post(`${this.url}/jobfairs/${jobFair._id}/images`, formData)
          .toPromise()
          .then(() => {
            this.toastrService.success('Fair uploaded successfully!');
            return this.router.navigate(['/main/jobfair']);
          });
      });
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
