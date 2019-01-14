import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/services/localStorage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Output('toggleNavigation') toggleNavigation$ = new EventEmitter();

  routes = {
    contests: '/main/contests',
    companies: '/main/companies',
    myContests: '/main/my-contests',
    jobFair: '/main/jobfair',
  }

  role = null;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    this.role = this.localStorageService.get('role');
  }

  onNavigationClick() {
    this.toggleNavigation$.emit();
  }

  onNavigate(routeKey) {
    this.router.navigate([this.routes[routeKey]]);
    this.onNavigationClick();
  }
}
