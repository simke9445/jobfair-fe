import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CompanyService } from 'src/services/company.service';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.css']
})
export class ReviewModalComponent implements OnInit {
  loading = false;

  reviewForm = new FormGroup({
    comment: new FormControl('', [Validators.required]),
    rating: new FormControl(1, [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<ReviewModalComponent>,
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {}

  onCancel(payload?) {
    this.dialogRef.close(payload);
  }

  async onSave() {
    this.loading = true;

    try {
      const review = await this.companyService.saveCompanyReview(this.reviewForm.value, this.data.company._id);
      this.onCancel(review);
      this.loading = false;
    } catch (err) {
      this.loading = false;
    }
  }

  ngOnInit() {
  }
}
