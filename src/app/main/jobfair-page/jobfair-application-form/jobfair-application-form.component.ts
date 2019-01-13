import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { JobFair } from 'src/models/jobfair';
import { JobfairService } from 'src/services/jobfair.service';

@Component({
  selector: 'app-jobfair-application-form',
  templateUrl: './jobfair-application-form.component.html',
  styleUrls: ['./jobfair-application-form.component.css']
})
export class JobfairApplicationFormComponent implements OnInit {
  @Input() jobFair: JobFair;

  @Output('applicationSubmit') applicationSubmit$ = new EventEmitter();

  applicationDetailsStep: FormGroup;
  servicesArray: FormArray;
  loading = false;

  packageNames;

  constructor(
    private formBuilder: FormBuilder,
    private jobFairService: JobfairService,
  ) { }

  ngOnInit() {
    this.applicationDetailsStep = this.formBuilder.group({
      packageName: ['', Validators.required],
      services: this.formBuilder.array(
        this.jobFair.services.map(() => false),
      ),
    });

    this.packageNames = this.jobFair.packages.map(pkg => pkg.title);
    this.servicesArray = (this.applicationDetailsStep.controls.services as any).controls;
  }

  get formPayload() {
    const formValue = this.applicationDetailsStep.value;

    return {
      packageId: this.jobFair.packages.find(pckg => pckg.title === formValue.packageName)._id,
      serviceIds: this.jobFair.services.filter((_, index) => formValue.services[index])
        .map(service => service._id),
    }
  }

  get formPayloadHydrated() {
    if (this.applicationDetailsStep.invalid) {
      return {
        package: {},
        services: [],
        totalPrice: 0,
      };
    }

    const hydratedData = {
      package: this.jobFair.packages.find(pkg => pkg._id === this.formPayload.packageId),
      services: this.formPayload.serviceIds.map(id => this.jobFair.services.find(s => s._id === id)),
    };

    return {
      ...hydratedData,
      totalPrice: hydratedData.package.price + hydratedData.services.reduce((acc, curr) => acc + curr.price, 0),
    };
  }

  async onSubmit() {
    this.loading = true;

    try {
      await this.jobFairService.saveFairApplication(this.formPayload, this.jobFair._id);
      this.loading = false;
      this.applicationSubmit$.emit();
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  }
}
