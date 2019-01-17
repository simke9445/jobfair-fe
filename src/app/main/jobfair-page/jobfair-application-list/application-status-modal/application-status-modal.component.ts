import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { addHours, format, parse } from 'date-fns';
import { Subscription } from 'rxjs';

import { JobfairService } from 'src/services/jobfair.service';
import { JobFairApplicationStatus } from 'src/constants';

@Component({
  selector: 'app-application-status-modal',
  templateUrl: './application-status-modal.component.html',
  styleUrls: ['./application-status-modal.component.css']
})
export class ApplicationStatusModalComponent implements OnInit, OnDestroy {
  loading = false;
  fromValueChange: Subscription;
  updateForm: FormGroup;
  scheduleControls: FormArray;

  constructor(
    private dialogRef: MatDialogRef<ApplicationStatusModalComponent>,
    private formBuilder: FormBuilder,
    private jobfairService: JobfairService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  get action() {
    return this.data.action;
  }

  get schedules() {
    return this.data.schedules;
  }

  ngOnInit() {
    const { action, application, schedules } = this.data;

    switch (action) {
      case 'update':
        this.updateForm = this.formBuilder.group({
          status: [application.status],
          schedules: this.formBuilder.array(schedules.map(() => false)),
        });
        break;
      case 'approve':
        this.updateForm = this.formBuilder.group({
          status: [JobFairApplicationStatus.Accepted],
          schedules: this.formBuilder.array(schedules.map(() => false)),
        });
        break;
      case 'reject':
        this.updateForm = this.formBuilder.group({
          comment: ['', Validators.required],
          status: [JobFairApplicationStatus.Rejected],
        });
        break;
      default:
        break;
    }

    if (action === 'update' || action === 'approve') {
      this.scheduleControls = (this.updateForm.controls.schedules as any).controls;
    }
  }

  onCancel(cancelPayload) {
    this.dialogRef.close(cancelPayload);
  }

  async onSave() {
    this.loading = true;

    try {
      const { application } = this.data;
      let payload = this.updateForm.value;

      if (payload.schedules) {
        payload = {
          ...payload,
          schedules: this.schedules
            .filter((_, index) => payload.schedules[index])
            .map(x => x._id),
        };
      }

      await this.jobfairService.updateFairApplication(payload, application.fair, application._id);
      this.onCancel(payload);
      this.loading = false;
    } catch (err) {
      this.loading = false;
    }
  }

  ngOnDestroy() {
    if (this.fromValueChange) {
      this.fromValueChange.unsubscribe();
    }
  }
}
