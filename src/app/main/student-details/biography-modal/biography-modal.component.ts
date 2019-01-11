import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-biography-modal',
  templateUrl: './biography-modal.component.html',
  styleUrls: ['./biography-modal.component.css']
})
export class BiographyModalComponent implements OnInit {
  biographyForm: FormGroup;
  spokenLanguages: FormArray;
  skills: FormArray;

  loading = false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BiographyModalComponent>,
    private studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit() {
    this.biographyForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: '',
      postalCode: '',
      city: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.email],
      website: '',
      skypeName: '',
      educationExperiences: this.formBuilder.array([this.createExpForm()]),
      workExperiences: this.formBuilder.array([this.createExpForm()]),
      spokenLanguages: this.formBuilder.array([]),
      skills: this.formBuilder.array([]),
    });

    this.skills = this.biographyForm.get('skills') as FormArray;
    this.spokenLanguages = this.biographyForm.get('spokenLanguages') as FormArray;
  }

  onRemoveExp(type: string, index: number) {
    const exps = this.biographyForm.get(`${type}Experiences`) as FormArray;

    exps.removeAt(index);
  }

  onAddExp(type: string) {
    const exps = this.biographyForm.get(`${type}Experiences`) as FormArray;

    exps.push(this.createExpForm());
  }
  
  createExpForm() {
    return this.formBuilder.group({
      position: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      isOngoing: false,
      organisationName: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onAddLang(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.spokenLanguages.push(this.formBuilder.control(value.trim()));
    }

    if (input) {
      input.value = '';
    }
  }

  onRemoveLang(index) {
    this.spokenLanguages.removeAt(index);
  }

  onAddSkill(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.skills.push(this.formBuilder.control(value.trim()));
    }

    if (input) {
      input.value = '';
    }
  }

  onRemoveSkill(index) {
    this.skills.removeAt(index);
  }

  onClose(shouldRefresh) {
    this.dialogRef.close({ shouldRefresh });
  }

  async onSave() {
    this.loading = true;
    
    try {
      await this.studentService.saveStudentBiography(this.biographyForm.value, this.data.student._id);
      this.loading = false;
      this.onClose(true);
    } catch (err) {
      this.loading = false;
    }
  }
}
