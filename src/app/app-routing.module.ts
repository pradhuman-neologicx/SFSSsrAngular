import { HomeComponent } from './website/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',

    component: LoginpagesComponent,
    children: [
      { path: '', redirectTo: 'sign_in', pathMatch: 'full' },
      { path: 'sign_in', component: SigninComponent },
      { path: 'reset_password/:id/:token', component: OtpComponent },
      { path: 'forgot_password', component: ForgotPasswordComponent },
    ],
  },
  {
    path: 'admin',

    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'DashboardComponent', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        // canActivate: [AuthGuard],
      },

      {
        path: 'user-management',

        component: UserManagementComponent,

        children: [
          { path: '', redirectTo: 'staff', pathMatch: 'full' },
          {
            path: 'staff',
            component: StaffComponent,
          },
        ],
      },

      {
        path: 'test-configuration',
        component: TestMasterComponent,
      },
      {
        path: 'test-management',
        component: TestManagementComponent,
      },
      {
        path: 'create-test',
        component: CreateTestComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'test-result',
        component: TestResultsComponent,
      },
      {
        path: 'equipment',
        component: EquipmentStatusComponent,
      },
      {
        path: 'accounts',
        component: AccountManagementComponent,
      },
      {
        path: 'master',
        component: MastersComponent,
        children: [
          { path: '', redirectTo: 'category', pathMatch: 'full' },
          {
            path: 'material',
            component: MaterialComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
