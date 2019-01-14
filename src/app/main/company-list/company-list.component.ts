import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

import { Company } from 'src/models/company';
import { CompanyService } from 'src/services/company.service';
import { bussinessAreas } from 'src/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  filterForm = new FormGroup({
    name: new FormControl(''),
    city: new FormControl(''),
    bussinessArea: new FormControl([]),
  });

  companies: Company[] = [];
  loading = false;
  bussinessAreas = bussinessAreas;

  constructor(
    private companyService: CompanyService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.fetchResults();
  }

  onDetailsClick(company: Company) {
    this.router.navigate([`/main/companies/${company._id}`]);
  }

  async fetchResults() {
    this.loading = true;

    try {
      this.companies = await this.companyService.getCompanies(this.filterForm.value);
      this.loading = false;
    } catch (err) {
      this.loading = false;
    }
  }
}
