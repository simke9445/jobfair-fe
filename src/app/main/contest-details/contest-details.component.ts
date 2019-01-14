import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ContestService } from 'src/services/contest.service';

import { ContestApplicationModalComponent } from './contest-application-modal/contest-application-modal.component';
import { LocalStorageService } from 'src/services/localStorage.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private contestService: ContestService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
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
        this.toastrService.success('Application submitted succesfully!');
      }
    });
  }

  onApplicationApprove(contest) {
    console.log('approved applications', contest);
  }

  async fetchData() {
    this.loading = true;

    try {
      this.contest = await this.contestService.getContestById(this.id);
      console.log(this.contest);
      this.loading = false;
    } catch (err) {
      this.loading = false;
    }
  }
}
