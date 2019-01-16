import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
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
      .toPromise()
      .then(biography => {
        this.toastrService.success('Biography saved successfully!');
        return biography;
      });
  }
}
