import { NgModule } from '@angular/core';
import { HomeComponent } from './website/home/home.component';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { SidenavComponent } from './admin/sidenav/sidenav.component';
import { SidenavHeaderComponent } from './admin/sidenav-header/sidenav-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './mat/mat.module';
import { MatMenuModule } from '@angular/material/menu';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingInterceptor } from './core/services/loading.interceptor';
import { LoginpagesComponent } from './admin/loginpages/loginpages.component';
import { ForgotPasswordComponent } from './admin/loginpages/forgot-password/forgot-password.component';
import { ApiService } from './core/services/api.service';
import { DataService } from './core/services/data.service';
import { JwtService } from './core/services/jwt.service';
import { SigninComponent } from './admin/loginpages/signin/signin.component';
import { OtpComponent } from './admin/loginpages/otp/otp.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { EmployeeService } from './core/services/Employee.service';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { NgSelectModule } from '@ng-select/ng-select';

import { UserManagementComponent } from './admin/user-management/user-management.component';
import { StaffComponent } from './admin/user-management/staff/staff.component';
import { TestMasterComponent } from './admin/test-master/test-master.component';
import { TestManagementComponent } from './admin/test-management/test-management.component';
import { CreateTestComponent } from './admin/test-management/create-test/create-test.component';
import { ReportComponent } from './admin/report/report.component';
import { TestResultsComponent } from './admin/test-results/test-results.component';
import { EquipmentStatusComponent } from './admin/equipment-status/equipment-status.component';
import { AccountManagementComponent } from './admin/account-management/account-management.component';

import { MastersComponent } from './admin/masters/masters.component';
import { MaterialComponent } from './admin/masters/material/material.component';
import { EngineerTestManagementComponent } from './admin/engineer-test-management/engineer-test-management.component';
import { UpdateTestComponent } from './admin/test-management/update-test/update-test.component';
import { LogoMarqueeComponent } from './website/components/logo-marquee/logo-marquee.component';
import { CtaComponent } from './website/components/cta/cta.component';
import { CaseStudiesComponent } from './website/case-studies/case-studies.component';
import { CareersComponent } from './website/careers/careers.component';
import { BlogComponent } from './website/blog/blog.component';
import { BlogDetailComponent } from './website/blog/blog-detail/blog-detail.component';
import { PrivacyComponent } from './website/privacy/privacy.component';
import { RefundComponent } from './website/refund/refund.component';
import { TermsComponent } from './website/terms/terms.component';
import { ResourcesComponent } from './website/resources/resources.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SidenavComponent,
    SidenavHeaderComponent,
    LoginpagesComponent,
    ForgotPasswordComponent,
    SigninComponent,
    OtpComponent,
    SpinnerComponent,
    DashboardComponent,
    UserManagementComponent,
    StaffComponent,
    TestMasterComponent,
    TestManagementComponent,
    CreateTestComponent,
    ReportComponent,
    TestResultsComponent,
    EquipmentStatusComponent,
    AccountManagementComponent,
    MastersComponent,
    MaterialComponent,
    EngineerTestManagementComponent,
    UpdateTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    NgSelectModule,
    MatMenuModule,
    NgxPaginationModule,
  ],
  providers: [
    DataService,
    ApiService,
    JwtService,
    DatePipe,
    EmployeeService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    provideClientHydration(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
