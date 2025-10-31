import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './website/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ForgotPasswordComponent } from './admin/loginpages/forgot-password/forgot-password.component';
import { SigninComponent } from './admin/loginpages/signin/signin.component';
import { LoginpagesComponent } from './admin/loginpages/loginpages.component';
import { OtpComponent } from './admin/loginpages/otp/otp.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { TestMasterComponent } from './admin/test-master/test-master.component';
import { StaffComponent } from './admin/user-management/staff/staff.component';
import { AuthGuard } from './core/auth/auth-guard';
import { UserManagementComponent } from './admin/user-management/user-management.component';
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
import { ServicesComponent } from './website/services/services.component';
import { AboutComponent } from './website/about/about.component';
import { ContactComponent } from './website/contact/contact.component';
import { CaseStudiesComponent } from './website/case-studies/case-studies.component';
import { CareersComponent } from './website/careers/careers.component';
import { BlogComponent } from './website/blog/blog.component';
import { BlogDetailComponent } from './website/blog/blog-detail/blog-detail.component';
import { TermsComponent } from './website/terms/terms.component';
import { RefundComponent } from './website/refund/refund.component';
import { PrivacyComponent } from './website/privacy/privacy.component';
import { ResourcesComponent } from './website/resources/resources.component';
import { FAQComponent } from './website/faq/faq.component';

const routes: Routes = [
  // 👇 Default route — shows HomeComponent
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Website pages route
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'case-studies', component: CaseStudiesComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:slug', component: BlogDetailComponent },
  { path: 'privacy-policy', component: PrivacyComponent },
  { path: 'refund-policy', component: RefundComponent },
  { path: 'terms-conditions', component: TermsComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'faq', component: FAQComponent },

  // Login / Authentication routes
  {
    path: 'login',
    component: LoginpagesComponent,
    children: [
      { path: '', redirectTo: 'sign_in', pathMatch: 'full' },
      { path: 'sign_in', component: SigninComponent },
      { path: 'reset-password/:id/:token', component: OtpComponent },
      { path: 'forgot_password', component: ForgotPasswordComponent },
    ],
  },

  // Admin routes
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-management',
        component: UserManagementComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'staff', pathMatch: 'full' },
          { path: 'staff', component: StaffComponent },
        ],
      },
      {
        path: 'test-configuration',
        component: TestMasterComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'engineer',
        component: EngineerTestManagementComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'test-management',
        component: TestManagementComponent,
        canActivate: [AuthGuard],
      },
      { path: 'create-test', component: CreateTestComponent },
      { path: 'update-test/:id', component: UpdateTestComponent },
      { path: 'report', component: ReportComponent },
      {
        path: 'test-result',
        component: TestResultsComponent,
        canActivate: [AuthGuard],
      },
      { path: 'equipment', component: EquipmentStatusComponent },
      {
        path: 'accounts',
        component: AccountManagementComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'master',
        component: MastersComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'material', pathMatch: 'full' },
          { path: 'material', component: MaterialComponent },
        ],
      },
    ],
  },

  // Wildcard (404) — optional
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
