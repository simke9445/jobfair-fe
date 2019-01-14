import { Routes } from '@angular/router';

import { LoginComponent } from 'src/app/auth/login/login.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { AuthComponent } from 'src/app/auth/auth.component';
import { MainComponent } from 'src/app/main/main.component';
import { StudentDetailsComponent } from 'src/app/main/student-details/student-details.component';
import { CompanyListComponent } from 'src/app/main/company-list/company-list.component';
import { CompanyDetailsComponent } from 'src/app/main/company-details/company-details.component';
import { ContestListComponent } from 'src/app/main/contest-list/contest-list.component';
import { ContestDetailsComponent } from 'src/app/main/contest-details/contest-details.component';
import { JobfairPageComponent } from 'src/app/main/jobfair-page/jobfair-page.component';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';

export const appRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
    ],
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'students/:id', component: StudentDetailsComponent },
      { path: 'companies', component: CompanyListComponent },
      { path: 'companies/:id', component: CompanyDetailsComponent },
      { path: 'contests', component: ContestListComponent },
      { path: 'contests/:id', component: ContestDetailsComponent },
      { path: 'jobfair', component: JobfairPageComponent },      
      { path: '', pathMatch: 'full', redirectTo: 'companies' },
    ],
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/auth/login',
    // pathMatch: 'full'
  },
 ];

