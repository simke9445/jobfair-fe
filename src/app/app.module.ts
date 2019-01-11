import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Angular Material Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule, MatNativeDateModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { appRoutes } from 'src/config/routes';
import { AuthHeaderInterceptor, ErrorNotificationInterceptor, UnauthorizedInterceptor } from 'src/utils/interceptors';
import { LocalStorageService } from 'src/services/localStorage.service';
import { AuthService } from 'src/services/auth.service';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainComponent } from './main/main.component';
import { CompanyListComponent } from './main/company-list/company-list.component';
import { StudentDetailsComponent } from './main/student-details/student-details.component';
import { CompanyDetailsComponent } from './main/company-details/company-details.component';
import { ContestListComponent } from './main/contest-list/contest-list.component';
import { ContestDetailsComponent } from './main/contest-details/contest-details.component';
import { FileUploadComponent } from './common/file-upload/file-upload.component';
import { NavigationComponent } from './main/navigation/navigation.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { LabelFieldComponent } from './common/label-field/label-field.component';
import { ReviewModalComponent } from './main/company-details/review-modal/review-modal.component';
import { ContestApplicationModalComponent } from './main/contest-details/contest-application-modal/contest-application-modal.component';
import { BiographyModalComponent } from './main/student-details/biography-modal/biography-modal.component';
import { CreateContestModalComponent } from './main/contest-list/create-contest-modal/create-contest-modal.component';
import { JobfairPageComponent } from './main/jobfair-page/jobfair-page.component';
import { JobfairCreationFormComponent } from './main/jobfair-page/jobfair-creation-form/jobfair-creation-form.component';
import { JobfairApplicationFormComponent } from './main/jobfair-page/jobfair-application-form/jobfair-application-form.component';
import { JobfairApplicationListComponent } from './main/jobfair-page/jobfair-application-list/jobfair-application-list.component';
import { JobfairApplicationDetailsComponent } from './main/jobfair-page/jobfair-application-details/jobfair-application-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    CompanyListComponent,
    StudentDetailsComponent,
    CompanyDetailsComponent,
    ContestListComponent,
    ContestDetailsComponent,
    FileUploadComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    LabelFieldComponent,
    ReviewModalComponent,
    ContestApplicationModalComponent,
    BiographyModalComponent,
    CreateContestModalComponent,
    JobfairPageComponent,
    JobfairCreationFormComponent,
    JobfairApplicationFormComponent,
    JobfairApplicationListComponent,
    JobfairApplicationDetailsComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ToastContainerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: ErrorNotificationInterceptor,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthHeaderInterceptor,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: UnauthorizedInterceptor,
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ReviewModalComponent,
    ContestApplicationModalComponent,
    BiographyModalComponent,
    CreateContestModalComponent,
  ],
})
export class AppModule { }
