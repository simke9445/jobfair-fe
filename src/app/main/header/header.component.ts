import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { LocalStorageService } from 'src/services/localStorage.service';
import { UserRole } from 'src/constants';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output('toggleNavigation') toggleNavigation$ = new EventEmitter();

  role = null;
  id = null;
  UserRole = UserRole;

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.role = this.localStorageService.get('role');
    this.id = this.localStorageService.get('id');

    console.log(this.role);
    console.log(this.id);
  }

  onNavigationClick() {
    this.toggleNavigation$.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
