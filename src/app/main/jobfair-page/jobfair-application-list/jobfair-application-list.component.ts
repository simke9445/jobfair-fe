import { Component, OnInit, Input } from '@angular/core';

import { JobFairApplicationStatus } from 'src/constants';
import { JobFairApplication, JobFair, JobFairInterval } from 'src/models/jobfair';
import { ApplicationStatusModalComponent } from './application-status-modal/application-status-modal.component';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobfairService } from 'src/services/jobfair.service';

@Component({
  selector: 'app-jobfair-application-list',
  templateUrl: './jobfair-application-list.component.html',
  styleUrls: ['./jobfair-application-list.component.css']
})
export class JobfairApplicationListComponent implements OnInit {
  @Input() applications: JobFairApplication[];
  @Input() biographyInterval: JobFairInterval;
  @Input() applicationInterval: JobFairInterval;
  @Input() jobFairId: string;

  intervalsForm: FormGroup;
  applicationStatus = JobFairApplicationStatus;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private jobFairService: JobfairService,
  ) {}

  ngOnInit() {
    this.intervalsForm = this.formBuilder.group({
      biographyInterval: this.formBuilder.group({
        from: [this.biographyInterval && this.biographyInterval.from, Validators.required],
        to: [this.biographyInterval && this.biographyInterval.to, Validators.required],
      }),
      applicationInterval: this.formBuilder.group({
        from: [this.applicationInterval && this.applicationInterval.from, Validators.required],
        to: [this.applicationInterval && this.applicationInterval.to, Validators.required],
      }),
    })
  }

  async onSaveInterval() {
    try {
      const payload = this.intervalsForm.value;

      await this.jobFairService.updateFair(payload, this.jobFairId);
    } catch (err) {
      console.log(err);
    }
  }

  onStatusUpdate(application, action) {
    const dialogRef = this.dialog.open(ApplicationStatusModalComponent, {
      width: '400px',
      data: { application, action }
    });

    dialogRef.afterClosed().subscribe((payload) => {
      if (!payload) {
        return;
      }

      switch (action) {
        case 'approve':
        case 'update':
          application.schedule.from = payload.from;
          application.schedule.to = payload.to;
          application.status = JobFairApplicationStatus.Accepted;
          break;
        case 'reject':
          application.comment = payload.comment;
          application.status = JobFairApplicationStatus.Rejected;
          break;
        default:
          break;
      }
    });
  }
}
