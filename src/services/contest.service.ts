import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContestService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  getContests(filter: any) {
    const params = new HttpParams()
      .set('filter', JSON.stringify(filter));

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
      .toPromise();
  }

  saveContestApplication(payload, id) {
    return this.httpClient.post(`${this.url}/contests/${id}/applications`, payload)
      .toPromise();
  }
}
