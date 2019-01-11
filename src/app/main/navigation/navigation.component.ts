import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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
    jobFair: '/main/jobfair',
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onNavigationClick() {
    this.toggleNavigation$.emit();
  }

  onNavigate(routeKey) {
    this.router.navigate([this.routes[routeKey]]);
    this.onNavigationClick();
  }
}
