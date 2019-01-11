import { Component, ViewChild, OnInit } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/services/localStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  
  constructor(
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;

    // const token = this.localStorageService.get('token');

    // if (token) {
    //   this.router.navigate(['/main']);
    // }
  }
}
