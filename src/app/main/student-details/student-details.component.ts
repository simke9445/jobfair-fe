import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { StudentService } from 'src/services/student.service';

import { BiographyModalComponent } from './biography-modal/biography-modal.component';
import { LocalStorageService } from 'src/services/localStorage.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student = {};
  loading = false;
  id = null;
  userId = null;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(map => {
      this.id = map.get('id');
      this.fetchData();
    });

    this.userId = this.localStorageService.get('id');
  }

  onBiographyUpdate(student) {
    const dialogRef = this.dialog.open(BiographyModalComponent, {
      width: '700px',
      height: '600px',
      data: { student }
    });

    dialogRef.afterClosed().subscribe((shouldRefresh) => {
      if (shouldRefresh) {
        this.fetchData();
      }
    });
  }

  async fetchData() {
    this.loading = true;

    try {
      this.student = await this.studentService.getStudentById(this.id);
      this.loading = false;
    } catch (err) {
      this.loading = false;
    }
  }
}
