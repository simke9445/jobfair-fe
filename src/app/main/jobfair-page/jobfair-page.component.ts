import { Component, OnInit } from '@angular/core';

import { JobfairService } from 'src/services/jobfair.service';
import { JobFair, JobFairApplication } from 'src/models/jobfair';

@Component({
  selector: 'app-jobfair-page',
  templateUrl: './jobfair-page.component.html',
  styleUrls: ['./jobfair-page.component.css']
})
export class JobfairPageComponent implements OnInit {
  // TODO: add company jobfair application form
  // TODO: add biography upload/company application intervals (set/unset - simple form)
  // TOOD: add application list for admin to approve/disapprove
  // - if approved, pop up a modal for entering the time slot (out of remaining available)
  activeFair: JobFair = null;
  loading = false;
  application: JobFairApplication = null;
  role = 'admin';

  constructor(
    private jobFairService: JobfairService,
  ) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.loading = true;

    try {
      this.activeFair = await this.jobFairService.getActiveFair();

      // if (this.role === 'company') {
      //   // for company we return the company application at first spot, or if not applied
      //   // we return an empty array
      //   this.application = this.activeFair.applications[0];
      // }

      this.loading = false;
    } catch (err) {
      this.loading = false;
      console.log(err);
    }
  }

  onApplicationSubmit() {
    this.getData();
  }
}
