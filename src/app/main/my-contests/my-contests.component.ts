import { Component, OnInit } from '@angular/core';
import { ContestService } from 'src/services/contest.service';

@Component({
  selector: 'app-my-contests',
  templateUrl: './my-contests.component.html',
  styleUrls: ['./my-contests.component.css']
})
export class MyContestsComponent implements OnInit {
  contests = [];
  loading = false;

  constructor(
    private companyService: ContestService,
  ) { }

  ngOnInit() {
    this.fetchResults();
  }

  async fetchResults() {
    this.loading = true;

    try {
      this.contests = await this.companyService.getContests({}, 'personal');
      this.loading = false;
    } catch (err) {
      this.loading = false;
    }
  }
}
