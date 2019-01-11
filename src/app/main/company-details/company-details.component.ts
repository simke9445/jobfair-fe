import { Component, OnInit } from '@angular/core';
import { Company } from 'src/models/company';
import { CompanyService } from 'src/services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ReviewModalComponent } from './review-modal/review-modal.component';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  company = {};
  loading = false;
  id = null;

  constructor(
    private companyService: CompanyService,
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

  onContestDetails(contest) {
    this.router.navigate([`/main/contests/${contest._id}`]);
  }

  onCompanyReview(company) {
    const dialogRef = this.dialog.open(ReviewModalComponent, {
      width: '400px',
      data: { company }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  async fetchData() {
    this.loading = true;

    try {
      this.company = await this.companyService.getCompanyById(this.id);
      this.loading = false;
    } catch (err) {
      this.loading = false;
    }
  }
}
