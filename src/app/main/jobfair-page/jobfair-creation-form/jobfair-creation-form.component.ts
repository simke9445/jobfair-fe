import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

import { validateJobFairJSON, validatePackageJSON } from 'src/utils/parsing';
import { jobFairFromJSON, jobFairServicesFromJSON, jobFairPackagesFromJSON, JobFairSchedule, JobFairPackage, JobFairService, schedulesFromPeriod } from 'src/models/jobfair';
import { jobFairScheduleTypes } from 'src/constants';
import { JobfairService } from 'src/services/jobfair.service';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jobfair-creation-form',
  templateUrl: './jobfair-creation-form.component.html',
  styleUrls: ['./jobfair-creation-form.component.css']
})
export class JobfairCreationFormComponent implements OnInit, OnDestroy {
  @Output('jobFairSubmit') jobFairSubmit$ = new EventEmitter();

  uploadFilesStep: FormGroup;
  basicInfoStep: FormGroup;
  advancedInfoStep: FormGroup;
  packageStep: FormGroup;

  areaControls: FormArray;
  scheduleControls: FormArray;
  packageControls: FormArray;
  serviceControls: FormArray;

  jobFairScheduleTypes = jobFairScheduleTypes;

  combinedSubscription: Subscription;

  fileOptions = {
    accept: '.json,application/json',
  };

  loading = false;

  logoImage = null;
  imageOptions = {
    maxWidth: 300,
    minWidth: 100,
    maxHeight: 300,
    minHeight: 100,
    accept: 'image/png,image/jpeg',
  };

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private formBuilder: FormBuilder,
    private jobfairService: JobfairService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.uploadFilesStep = this.formBuilder.group({
      jobFairFile: [false, Validators.requiredTrue],
      packageFile: [false, Validators.requiredTrue],
    });
    this.basicInfoStep = this.formBuilder.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      place: ['', Validators.required],
      description: ['', Validators.required],
      areas: this.formBuilder.array([]),
    });
    this.advancedInfoStep = this.formBuilder.group({
      logoImage: ['', Validators.required],
      schedules: this.formBuilder.array([], Validators.required),
    });
    this.packageStep = this.formBuilder.group({
      packages: this.formBuilder.array([]),
      services: this.formBuilder.array([]),
    });

    this.areaControls = <FormArray>this.basicInfoStep.controls.areas;
    this.scheduleControls = <FormArray>this.advancedInfoStep.controls.schedules;
    this.packageControls = <FormArray>this.packageStep.controls.packages;
    this.serviceControls = <FormArray>this.packageStep.controls.services;

    this.combinedSubscription = combineLatest(
      this.basicInfoStep.get('startDate').valueChanges,
      this.basicInfoStep.get('endDate').valueChanges,
      this.basicInfoStep.get('startTime').valueChanges,
      this.basicInfoStep.get('endTime').valueChanges,
    ).subscribe(([startDate, endDate, startTime, endTime]) => this.createSchedules(startDate, endDate, startTime, endTime));
  }

  ngOnDestroy() {
    this.combinedSubscription.unsubscribe();
  }

  createSchedule(schedule?: JobFairSchedule) {
    return this.formBuilder.group({
      type: [schedule!.type, Validators.required],
      area: [schedule!.area, Validators.required],
      from: [schedule!.from, Validators.required],
      to: [schedule!.to, Validators.required],
    });
  }

  createPackage(jobFairPackage?: JobFairPackage) {
    return this.formBuilder.group({
      title: [jobFairPackage!.title, Validators.required],
      videoPromotion: [jobFairPackage!.videoPromotion, Validators.required],
      numOfLessons: [jobFairPackage!.numOfLessons, Validators.required],
      numOfWorkshops: [jobFairPackage!.numOfWorkshops, Validators.required],
      numOfPresentations: [jobFairPackage!.numOfPresentations, Validators.required],
      totalNumOfCompanies: jobFairPackage!.totalNumOfCompanies,
      content: this.formBuilder.array(jobFairPackage!.content),
      price: [jobFairPackage!.price, Validators.required],
    });
  }

  createService(service?: JobFairService) {
    return this.formBuilder.group({
      price: [service!.price, Validators.required],
      description: [service!.description, Validators.required],
    });
  }

  createSchedules(startDate: Date, endDate: Date, startTime: string, endTime: string) {
    const schedules = schedulesFromPeriod(startDate, endDate, startTime, endTime);
    const clearFormArray = (formArray: FormArray) => {
      while (formArray.length !== 0) {
        formArray.removeAt(0);
      }
    }

    clearFormArray(this.scheduleControls);
    schedules.forEach(schedule => this.scheduleControls.push(this.createSchedule(schedule)));
  }

  onJobFairJSONReady(jobFairJSON: any) {
    try {
      const jfJSON = validateJobFairJSON(jobFairJSON);
      const { schedules, areas, ...jobFairData } = jobFairFromJSON(jfJSON);

      // TODO: prepopulate form
      this.basicInfoStep.patchValue({
        ...jobFairData,
      });

      areas.forEach(area => this.areaControls.push(this.formBuilder.control(area)));

      this.uploadFilesStep.patchValue({
        jobFairFile: true,
      });
    } catch (err) {
      this.toastrService.error('JobFair JSON File Parsing failed! Please check the file for structural errors.');
      console.log(err);
    }
  }

  onPackagesJSONReady(packagesJSON: any) {
    try {
      const pckgJSON = validatePackageJSON(packagesJSON);
      const packages = jobFairPackagesFromJSON(pckgJSON);
      const services = jobFairServicesFromJSON(pckgJSON);

      // TODO: prepopulate form
      packages.forEach(pckg => this.packageControls.push(this.createPackage(pckg)));
      services.forEach(service => this.serviceControls.push(this.createService(service)));

      this.uploadFilesStep.patchValue({
        packageFile: true,
      });
    } catch (err) {
      this.toastrService.error('Packages JSON File Parsing failed! Please check the file for structural errors.');
      console.log(err);
    }
  }

  onAddArea(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.areaControls.push(this.formBuilder.control(value.trim()));
    }

    if (input) {
      input.value = '';
    }
  }

  onRemoveArea(index) {
    this.areaControls.removeAt(index);
  }

  onLogoPreviewReady(logoImage) {
    this.logoImage = logoImage;
  }

  onLogoFileReady(logoImage) {
    this.advancedInfoStep.patchValue({
      logoImage,
    });
  }

  onAddContentToPackage(packageIndex) {
    const packageForm = <FormGroup>this.packageControls.controls[packageIndex];
    const contentArray = <FormArray>packageForm.controls.content;

    contentArray.push(this.formBuilder.control('', Validators.required));
  }

  onRemoveContentFromPackage(packageIndex, contentIndex) {
    const packageForm = <FormGroup>this.packageControls.controls[packageIndex];
    const contentArray = <FormArray>packageForm.controls.content;

    contentArray.removeAt(contentIndex);
  }

  onAddService() {
    this.serviceControls.push(this.createService({ price: null, description: '' }));
  }

  onRemoveService(index) {
    this.serviceControls.removeAt(index);
  }

  get formValues() {
    return {
      ...this.basicInfoStep.value,
      ...this.packageStep.value,
      ...this.advancedInfoStep.value,
    }
  }

  async onSubmit() {
    this.loading = true;

    try {
      const { logoImage, ...payload } = this.formValues;

      await this.jobfairService.saveFair(payload, logoImage);
      this.jobFairSubmit$.emit();
      this.loading = false;
    } catch (err) {
      this.loading = false;
    }
  }
}
