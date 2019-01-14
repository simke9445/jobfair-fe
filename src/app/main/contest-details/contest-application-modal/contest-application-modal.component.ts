import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContestService } from 'src/services/contest.service';
import { StudentService } from 'src/services/student.service';
import { LocalStorageService } from 'src/services/localStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contest-application-modal',
  templateUrl: './contest-application-modal.component.html',
  styleUrls: ['./contest-application-modal.component.css']
})
export class ContestApplicationModalComponent implements OnInit {
  loading = false;
  applicationForm: FormGroup;
  student: any = {};

  constructor(
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ContestApplicationModalComponent>,
    private contestService: ContestService,
    private studentService: StudentService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  async ngOnInit() {
    this.applicationForm = this.formBuilder.group({
      coverLetterPdf: '',
      coverLetter: '',
      includeBiography: [false, Validators.requiredTrue],
    });

    this.student = await this.studentService.getStudentById(
      this.localStorageService.get('id'),
    );
  }

  onPdfReady(event) {
    this.applicationForm.patchValue({
      coverLetterPdf: event,
    });
  }

  onUploadBiography() {
    this.router.navigate([`main/students/${this.student._id}`]);
    this.onClose();
  }

  onClose(payload?) {
    this.dialogRef.close(payload);
  }

  async onSave() {
    this.loading = true;

    try {
      const application = await this.contestService.saveContestApplication(
        this.applicationForm.value,
        this.data.contest._id,
      );
      this.loading = false;
      this.onClose(application);
    } catch (err) {
      this.loading = false;
    }
  }
}
