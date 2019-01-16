import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  getStudentById(id: string) {
    return this.httpClient.get(`${this.url}/students/${id}`)
      .toPromise()
      .then((student: any) => ({
        ...student,
        image: `${this.url}/${student.image}`,
      }));
  }

  saveStudentBiography(payload, id) {
    return this.httpClient.post(`${this.url}/students/${id}/biography`, payload)
      .toPromise();
  }
}
