import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ContestService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
  ) { }

  getContests(filter: any, status) {
    const params = new HttpParams()
      .set('filter', JSON.stringify(filter))
      .set('status', status);

    return this.httpClient.get<any[]>(`${this.url}/contests`, {
      params
    }).toPromise();
  }

  getContestById(id: string) {
    return this.httpClient.get(`${this.url}/contests/${id}`)
      .toPromise();
  }

  saveContest(payload) {
    return this.httpClient.post(`${this.url}/contests`, payload)
      .toPromise()
      .then(contest => {
        this.toastrService.success('Contest saved successfully!');
        return contest;
      });
  }

  updateContestApplications(payload, id) {
    return this.httpClient.patch(`${this.url}/contests/${id}/applications`, payload)
      .toPromise()
      .then(applications => {
        this.toastrService.success('Applications updated successfully!');
        return applications;
      });
  }

  saveContestApplication(payload, id) {
    const formData = new FormData();

    Object.keys(payload).forEach(key => formData.append(key, payload[key]));

    return this.httpClient.post(`${this.url}/contests/${id}/applications`, formData)
      .toPromise()
      .then(application => {
        this.toastrService.success('Application created successfully!');
        return application;
      });
  }
}
