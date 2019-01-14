import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { addHours, format, parse } from 'date-fns';

import { JobfairService } from 'src/services/jobfair.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-application-status-modal',
  templateUrl: './application-status-modal.component.html',
  styleUrls: ['./application-status-modal.component.css']
})
export class ApplicationStatusModalComponent implements OnInit, OnDestroy {
  loading = false;
  fromValueChange: Subscription;
  updateForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ApplicationStatusModalComponent>,
    private formBuilder: FormBuilder,
    private jobfairService: JobfairService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  get action() {
    return this.data.action;
  }

  ngOnInit() {
    const { action, application } = this.data;

    switch (action) {
      case 'update':
        this.updateForm = this.formBuilder.group({
          from: [application.schedule.from, Validators.required],
          to: [application.schedule.to, Validators.required],
        });
        break;
      case 'approve':
        this.updateForm = this.formBuilder.group({
          from: ['', Validators.required],
          to: ['', Validators.required],
        });
        break;
      case 'reject':
        this.updateForm = this.formBuilder.group({
          comment: ['', Validators.required],
        });
        break;
      default:
        break;
    }

    if (action === 'update' || action === 'approve') {
      this.fromValueChange = this.updateForm.controls.from.valueChanges.subscribe(value => {
        const placeholderDate = parse(`2014-02-11T${value}:00`);
        const toValue = format(addHours(placeholderDate, 1), 'HH:mm');

        this.updateForm.controls.to.setValue(toValue);
      })
    }
  }

  onCancel(cancelPayload) {
    this.dialogRef.close(cancelPayload);
  }

  async onSave() {
    this.loading = true;

    try {
      const { application } = this.data;
      const payload = this.updateForm.value;
      // await this.jobfairService.updateFairApplication(payload, application.fair, application._id);
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
