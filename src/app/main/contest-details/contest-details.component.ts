import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { ContestService } from 'src/services/contest.service';
import { LocalStorageService } from 'src/services/localStorage.service';
import { ContestApplicationStatus } from 'src/constants';

import { ContestApplicationModalComponent } from './contest-application-modal/contest-application-modal.component';

@Component({
  selector: 'app-contest-details',
  templateUrl: './contest-details.component.html',
  styleUrls: ['./contest-details.component.css']
})
export class ContestDetailsComponent implements OnInit {
  contest: any = {};
  loading = false;
  id = null;
  role = null;
  userId = null;
  applicationsForm: FormGroup;
  applicationControls: FormArray;

  constructor(
    private contestService: ContestService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(map => {
      this.id = map.get('id');
      this.fetchData();
    });
    this.role = this.localStorageService.get('role');
    this.userId = this.localStorageService.get('id');
  }

  get isCompanyContest() {
    return this.userId === this.contest.company;
  }

  onContestApply(contest) {
    const dialogRef = this.dialog.open(ContestApplicationModalComponent, {
      width: '600px',
      data: { contest }
    });

    dialogRef.afterClosed().subscribe((application) => {
      if (application) {
        this.fetchData();
      }
    });
  }

  async onApplicationStatusUpdate(status: ContestApplicationStatus) {
    try {
      this.loading = true;
      const formValue = this.applicationsForm.value.applications;

      const applicationIds = this.contest.applications
        .filter((_, index) => formValue[index])
        .map((x => x._id));

      await this.contestService.updateContestApplications({
        applicationIds,
        status,
      }, this.id);
      this.fetchData();
      this.loading = false;
    } catch (err) {
      this.loading = false;
    }
  }

  onApplicationApprove() {
    this.onApplicationStatusUpdate(ContestApplicationStatus.Accepted);
  }

  onApplicationReject() {
    this.onApplicationStatusUpdate(ContestApplicationStatus.Rejected);
  }

  async fetchData() {
    this.loading = true;

    try {
      this.contest = await this.contestService.getContestById(this.id);
      console.log(this.contest);
      this.applicationsForm = this.formBuilder.group({
        applications: this.formBuilder.array(this.contest.applications.map(() => false)),
      });
      this.applicationControls = (this.applicationsForm.controls.applications as any).controls;
      this.loading = false;
    } catch (err) {
      this.loading = false;
    }
  }
}
