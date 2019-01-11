import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ContestService } from 'src/services/contest.service';
import { contestTypes } from 'src/constants';

@Component({
  selector: 'app-create-contest-modal',
  templateUrl: './create-contest-modal.component.html',
  styleUrls: ['./create-contest-modal.component.css']
})
export class CreateContestModalComponent implements OnInit {
  loading = false;
  contestForm: FormGroup;
  contestTypes = contestTypes;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateContestModalComponent>,
    private contestService: ContestService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  async ngOnInit() {
    this.contestForm = this.formBuilder.group({
      position: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  async onSave() {
    this.loading = true;

    try {
      // await this.contestService.saveContest(
      //   this.contestForm.value,
      // );
      // this.loading = false;
      // this.onClose();
      console.log(this.contestForm.value);
    } catch (err) {
      this.loading = false;
    }
  }
}
