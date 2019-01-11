import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ContestService } from 'src/services/contest.service';

import { ContestApplicationModalComponent } from './contest-application-modal/contest-application-modal.component';

@Component({
  selector: 'app-contest-details',
  templateUrl: './contest-details.component.html',
  styleUrls: ['./contest-details.component.css']
})
export class ContestDetailsComponent implements OnInit {

  contest = {};
  loading = false;
  id = null;

  constructor(
    private contestService: ContestService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(map => {
      this.id = map.get('id');
      this.fetchData();
    });
  }

  onContestApply(contest) {
    const dialogRef = this.dialog.open(ContestApplicationModalComponent, {
      width: '600px',
      data: { contest }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
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
