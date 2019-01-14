import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-common-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.css']
})
export class ContestListComponent implements OnInit {
  @Input() contests: any[];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onDetailsClick(contest) {
    this.router.navigate([`/main/contests/${contest._id}`]);
  }
}
