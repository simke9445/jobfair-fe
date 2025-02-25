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
      jobFair = await this.getFairById(jobFair._id);
    }

    return jobFair;
  }

  getFairById(id) {
    return this.httpClient.get(`${this.url}/jobfairs/${id}`)
        .toPromise()
        .then((fair: any) => ({
          ...fair,
          logoImage: `${this.url}/${fair.logoImage}`,
        }));
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
      .toPromise()
      .then(fair => {
        this.toastrService.success('Fair updated successfully!');
        return fair;
      });
  }

  saveFairApplication(payload, fairId) {
    return this.httpClient.post(`${this.url}/jobfairs/${fairId}/applications`, payload)
      .toPromise()
      .then(application => {
        this.toastrService.success('Application saved succesfully!');
        return application;
      });
  }

  updateFairApplication(payload, fairId, id) {
    return this.httpClient.patch(`${this.url}/jobfairs/${fairId}/applications/${id}`, payload)
      .toPromise()
      .then(application => {
        this.toastrService.success('Application updated successfully!');
        return application;
      });
  }
}
