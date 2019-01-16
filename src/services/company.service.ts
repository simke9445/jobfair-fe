import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Company } from 'src/models/company';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCompanies(filter: any) {
    const params = new HttpParams()
      .set('filter', JSON.stringify(filter));

    return this.httpClient.get<Company[]>(`${this.url}/companies`, {
      params
    }).toPromise();
  }

  getCompanyById(id: string) {
    return this.httpClient.get<Company>(`${this.url}/companies/${id}`)
      .toPromise()
      .then((company: any) => ({
        ...company,
        image: `${this.url}/${company.image}`,
      }));
  }

  saveCompanyReview(payload, id) {
    return this.httpClient.post(`${this.url}/companies/${id}/review`, payload)
      .toPromise();
  }
}
