import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { NotificationService } from 'src/app/core/services/notificationnew.service';

interface TestStats {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
}

interface RecentTest {
  id: string;
  name: string;
  type: string;
  status: 'completed' | 'in-progress' | 'pending' | 'failed';
  date: Date;
  operator: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('succesfullyMesaage', [
      state(
        'void',
        style({
          transform: 'translateX(-30%)',
          opacity: 0,
        })
      ),
      transition(':enter, :leave', [
        animate('0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)'),
      ]),
    ]),
    trigger('slideIn', [
      state(
        'void',
        style({
          transform: 'translateX(100%)',
          opacity: 0,
        })
      ),
      transition(':enter', [
        animate(
          '0.5s ease-out',
          style({
            transform: 'translateX(0)',
            opacity: 1,
          })
        ),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  testStats: TestStats = {
    total: 156,
    completed: 132,
    inProgress: 8,
    pending: 16,
  };

  recentTests: RecentTest[] = [
    {
      id: 'TS-2024-001',
      name: 'Steel Rod Tensile Test',
      type: 'Tensile Strength',
      status: 'completed',
      date: new Date('2024-01-15T10:30:00'),
      operator: 'Dr. Sarah Johnson',
    },
    {
      id: 'CT-2024-002',
      name: 'Concrete Compression',
      type: 'Compression Test',
      status: 'in-progress',
      date: new Date('2024-01-15T14:15:00'),
      operator: 'Mike Chen',
    },
    {
      id: 'HT-2024-003',
      name: 'Aluminum Hardness',
      type: 'Hardness Test',
      status: 'pending',
      date: new Date('2024-01-16T09:00:00'),
      operator: 'Lisa Rodriguez',
    },
    {
      id: 'IT-2024-004',
      name: 'Polymer Impact Test',
      type: 'Impact Test',
      status: 'completed',
      date: new Date('2024-01-14T16:45:00'),
      operator: 'Dr. Robert Kim',
    },
    {
      id: 'FT-2024-005',
      name: 'Metal Fatigue Analysis',
      type: 'Fatigue Test',
      status: 'failed',
      date: new Date('2024-01-13T11:20:00'),
      operator: 'Emma Thompson',
    },
  ];
  openSecondsuccess = false;
  name: string | null = '';
  firstlogin: boolean | undefined;

  completedTests: any[] = [];
  pendingTests: any[] = [];
  completedTestsPage: number = 1;
  pendingTestsPage: number = 1;
  tableSizes: any = [10, 20, 50, 100, 'all'];
  completedTableSize: any = 10;
  pendingTableSize: any = 10;
  completedTotalRecords: number = 0;
  pendingTotalRecords: number = 0;
  completedSearchText: string = '';
  pendingSearchText: string = '';
  completedStartDate: string = '';
  completedEndDate: string = '';
  pendingStartDate: string = '';
  pendingEndDate: string = '';
  completedShowReset: boolean = false;
  pendingShowReset: boolean = false;
  completedShowDateReset: boolean = false;
  pendingShowDateReset: boolean = false;
  completedForm!: FormGroup;
  pendingForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private notificationService: NotificationService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.firstlogin = this.jwtService.getfirstLoggedIn();
      if (this.firstlogin === false || this.firstlogin === undefined) {
        if (params['success'] === 'true') {
          this.openSecondsuccess = true;
          this.jwtService.firstLoggedIn(true);
          setTimeout(() => {
            this.openSecondsuccess = false;
          }, 1800);
        }
      }
    });
  }

  userRole: any;
  ngOnInit(): void {
    this.name = this.jwtService.getName();
    this.userRole = localStorage.getItem('Role');
    this.completedForm = this.formBuilder.group({
      searchbar: ['', [Validators.required]],
      startDate: [''],
      endDate: [''],
    });
    this.pendingForm = this.formBuilder.group({
      searchbar: ['', [Validators.required]],
      startDate: [''],
      endDate: [''],
    });
    this.firstlogin = this.jwtService.getfirstLoggedIn();
    this.fetchDashboardStats();
    this.fetchCompletedTests();
    this.fetchPendingTests();
  }

  fetchCompletedTests() {
    this.employeeService
      .getCompletedTests(
        this.completedTableSize,
        this.completedTestsPage,
        this.completedSearchText,
        this.completedStartDate,
        this.completedEndDate
      )
      .subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.completedTests = response.records;
            this.completedTotalRecords = response.total;
          }
        },
        error: (error: any) => {
          this.notificationService.show('Failed to fetch completed tests');
          console.error('Error fetching completed tests:', error);
        },
      });
  }

  fetchPendingTests() {
    this.employeeService
      .getPendingTests(
        this.pendingTableSize,
        this.pendingTestsPage,
        this.pendingSearchText,
        this.pendingStartDate,
        this.pendingEndDate
      )
      .subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.pendingTests = response.records;
            this.pendingTotalRecords = response.total;
          }
        },
        error: (error: any) => {
          this.notificationService.show('Failed to fetch pending tests');
          console.error('Error fetching pending tests:', error);
        },
      });
  }

  searchfun(type: 'completed' | 'pending') {
    if (type === 'completed') {
      if (this.completedForm.valid) {
        this.completedShowReset = true;
        this.completedSearchText = this.completedForm.get('searchbar')?.value;
        this.completedTestsPage = 1;
        this.fetchCompletedTests();
      } else {
        this.completedForm.markAllAsTouched();
      }
    } else {
      if (this.pendingForm.valid) {
        this.pendingShowReset = true;
        this.pendingSearchText = this.pendingForm.get('searchbar')?.value;
        this.pendingTestsPage = 1;
        this.fetchPendingTests();
      } else {
        this.pendingForm.markAllAsTouched();
      }
    }
  }

  resetsearchbar(type: 'completed' | 'pending') {
    if (type === 'completed') {
      this.completedForm.reset();
      this.completedShowReset = false;
      this.completedSearchText = '';
      this.completedStartDate = '';
      this.completedEndDate = '';
      this.completedShowDateReset = false;
      this.completedTestsPage = 1;
      this.fetchCompletedTests();
    } else {
      this.pendingForm.reset();
      this.pendingShowReset = false;
      this.pendingSearchText = '';
      this.pendingStartDate = '';
      this.pendingEndDate = '';
      this.pendingShowDateReset = false;
      this.pendingTestsPage = 1;
      this.fetchPendingTests();
    }
  }

  resetDateFilters(type: 'completed' | 'pending') {
    if (type === 'completed') {
      this.completedForm.get('startDate')?.reset();
      this.completedForm.get('endDate')?.reset();
      this.completedStartDate = '';
      this.completedEndDate = '';
      this.completedShowDateReset = false;
      this.completedTestsPage = 1;
      this.fetchCompletedTests();
    } else {
      this.pendingForm.get('startDate')?.reset();
      this.pendingForm.get('endDate')?.reset();
      this.pendingStartDate = '';
      this.pendingEndDate = '';
      this.pendingShowDateReset = false;
      this.pendingTestsPage = 1;
      this.fetchPendingTests();
    }
  }

  onTableSizeChange(event: any, type: 'completed' | 'pending'): void {
    if (type === 'completed') {
      this.completedTableSize = event.target.value;
      this.completedTestsPage = 1;
      this.fetchCompletedTests();
    } else {
      this.pendingTableSize = event.target.value;
      this.pendingTestsPage = 1;
      this.fetchPendingTests();
    }
  }

  onTableDataChange(event: any, type: 'completed' | 'pending') {
    if (type === 'completed') {
      this.completedTestsPage = event;
      this.fetchCompletedTests();
    } else {
      this.pendingTestsPage = event;
      this.fetchPendingTests();
    }
  }

  filterCompletedTestsByDate() {
    this.completedStartDate = this.completedForm.get('startDate')?.value;
    this.completedEndDate = this.completedForm.get('endDate')?.value;
    this.completedShowDateReset = !!(
      this.completedStartDate || this.completedEndDate
    );
    this.completedTestsPage = 1;
    this.fetchCompletedTests();
  }

  filterPendingTestsByDate() {
    this.pendingStartDate = this.pendingForm.get('startDate')?.value;
    this.pendingEndDate = this.pendingForm.get('endDate')?.value;
    this.pendingShowDateReset = !!(
      this.pendingStartDate || this.pendingEndDate
    );
    this.pendingTestsPage = 1;
    this.fetchPendingTests();
  }

  dashboardStats: any;
  fetchDashboardStats() {
    this.employeeService.GetDashboardData().subscribe((response: any) => {
      if (response.status === 200) {
        this.dashboardStats = response;
      }
    });
  }
}
