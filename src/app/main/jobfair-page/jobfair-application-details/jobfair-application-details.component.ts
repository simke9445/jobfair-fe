import { Component, OnInit, Input } from '@angular/core';

import { JobFairApplication } from 'src/models/jobfair';
import { JobFairApplicationStatus } from 'src/constants';

@Component({
  selector: 'app-jobfair-application-details',
  templateUrl: './jobfair-application-details.component.html',
  styleUrls: ['./jobfair-application-details.component.css']
})
export class JobfairApplicationDetailsComponent implements OnInit {
  @Input() application: JobFairApplication;

  JobFairApplicationStatus = JobFairApplicationStatus;

  constructor() { }

  ngOnInit() {
    console.log(this.application);
  }

}
