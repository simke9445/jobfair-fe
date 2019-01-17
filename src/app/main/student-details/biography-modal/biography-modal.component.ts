import { Component, OnInit, Inject, Input } from '@angular/core';
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

  get biography() {
    return this.data.student.biography;
  }

  ngOnInit() {
    this.biographyForm = this.createBiographyForm(this.biography);

    this.skills = this.biographyForm.get('skills') as FormArray;
    this.spokenLanguages = this.biographyForm.get('spokenLanguages') as FormArray;
  }

  createBiographyForm(biography: any = {}) {
    let educationExperiences = [{}];
    if (biography && biography.educationExperiences && biography.educationExperiences.length > 0) {
      educationExperiences = biography.educationExperiences;
    }

    let workExperiences = [{}];
    if (biography && biography.workExperiences && biography.workExperiences.length > 0) {
      workExperiences = biography.workExperiences;
    }

    let skills = [];
    if (biography && biography.skills) {
      skills = biography.skills;
    }

    let spokenLanguages = [];
    if (biography && biography.spokenLanguages) {
      spokenLanguages = biography.spokenLanguages;
    }

    return this.formBuilder.group({
      firstName: [biography.firstName, Validators.required],
      lastName: [biography.lastName, Validators.required],
      streetAddress: biography.streetAddress,
      postalCode: biography.postalCode,
      city: [biography.city, Validators.required],
      country: [biography.country, Validators.required],
      phoneNumber: [biography.phoneNumber, Validators.required],
      email: [biography.email, Validators.email],
      website: biography.website,
      skypeName: biography.skypeName,
      educationExperiences: this.formBuilder.array(educationExperiences.map(x => this.createExpForm(x))),
      workExperiences: this.formBuilder.array(workExperiences.map(x => this.createExpForm(x))),
      spokenLanguages: this.formBuilder.array(spokenLanguages),
      skills: this.formBuilder.array(skills),
    });
  }

  onRemoveExp(type: string, index: number) {
    const exps = this.biographyForm.get(`${type}Experiences`) as FormArray;

    exps.removeAt(index);
  }

  onAddExp(type: string) {
    const exps = this.biographyForm.get(`${type}Experiences`) as FormArray;

    exps.push(this.createExpForm());
  }

  createExpForm(exp: any = {}) {
    return this.formBuilder.group({
      position: [exp.position, Validators.required],
      from: [exp.from, Validators.required],
      to: [exp.to, Validators.required],
      isOngoing: exp.isOngoing,
      organisationName: [exp.organisationName, Validators.required],
      city: [exp.city, Validators.required],
      country: [exp.country, Validators.required],
      description: [exp.description, Validators.required],
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
    this.dialogRef.close(shouldRefresh);
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
