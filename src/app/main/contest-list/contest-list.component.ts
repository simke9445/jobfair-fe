import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { contestTypes } from 'src/constants';
import { ContestService } from 'src/services/contest.service';

import { CreateContestModalComponent } from './create-contest-modal/create-contest-modal.component';
import { LocalStorageService } from 'src/services/localStorage.service';

@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.css']
})
export class ContestListComponent implements OnInit {
  filterForm = new FormGroup({
    position: new FormControl(''),
    type: new FormControl([]),
  });

  contestTypes = contestTypes;
  loading = false;
  contests = [];
  role = null;

  constructor(
    private companyService: ContestService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    this.fetchResults();
    this.role = this.localStorageService.get('role');
  }

  addContest() {
    const dialogRef = this.dialog.open(CreateContestModalComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((contest) => {
      if (contest) {
        this.fetchResults();
      }
    });
  }

  async fetchResults() {
    this.loading = true;

    try {
      this.contests = await this.companyService.getContests(this.filterForm.value, 'active');
      this.loading = false;
    } catch (err) {
      this.loading = false;
    }
  }
}
