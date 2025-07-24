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
import { JwtService } from 'src/app/core/services/jwt.service';

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
  stats = {
    totalUsers: 1250,
    totalPharmacies: 320,
    totalDistributors: 85,
    silentUsers: 150,
    dailyActiveUsers: 450,
    newlyRegisteredUsers: 75,
  };
  storesAwaitingApproval = [
    { name: 'HealthPlus Pharmacy', submissionDate: '2025-05-10' },
    { name: 'CareMed Store', submissionDate: '2025-05-12' },
    { name: 'Wellness Hub', submissionDate: '2025-05-14' },
  ];

  licenseExpiryAlerts = [
    {
      id: 'LIC-001',
      pharmacyName: 'City Pharma',
      expiryDate: '2025-04-30',
      status: 'Expired',
    },
    {
      id: 'LIC-002',
      pharmacyName: 'Green Cross',
      expiryDate: '2025-05-05',
      status: 'Expired',
    },
    {
      id: 'LIC-003',
      pharmacyName: 'MediCare',
      expiryDate: '2025-05-20',
      status: 'Expiring Soon',
    },
    {
      id: 'LIC-004',
      pharmacyName: 'HealthPoint',
      expiryDate: '2025-05-25',
      status: 'Expiring Soon',
    },
  ];

  completedTests: any[] = [];
  pendingTests: any[] = [];
  completedTestsPage: number = 1;
  pendingTestsPage: number = 1;
  showreset: boolean = false;
  searchText: string | undefined;
  tableSize: any = 10;
  tableSizes: any = [10, 20, 50, 100, 'all'];
  totalRecords: any;
  page: number = 1;
  searchbarform!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private formBuilder: FormBuilder
  ) {
    this.route.queryParams.subscribe((params) => {
      this.firstlogin = this.jwtService.getfirstLoggedIn();
      console.log(this.firstlogin);
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

  ngOnInit(): void {
    this.name = this.jwtService.getName();
    this.searchbarform = this.formBuilder.group({
      searchbar: ['', [Validators.required]],
    });
    this.firstlogin = this.jwtService.getfirstLoggedIn();
    console.log(this.firstlogin);
    // TODO: Fetch real stats from a service
    // this.fetchDashboardStats();

    // Example: Assign sample data for completed and pending tests
    this.completedTests = [
      { id: 'T101', name: 'CC Cube Test', date: new Date(), operator: 'Ravi' },
      { id: 'T102', name: 'Steel Test', date: new Date(), operator: 'Aarti' },
      // ...add more items for pagination demo if needed...
    ];
    this.pendingTests = [
      { id: 'T201', name: 'Bricks Test', date: new Date(), operator: 'Suresh' },
      { id: 'T202', name: 'Cement Test', date: new Date(), operator: 'Mehta' },
      // ...add more items for pagination demo if needed...
    ];
  }
  searchfun() {
    if (this.searchbarform.valid) {
      this.showreset = true;
      this.searchText = this.searchbarform.get('searchbar')?.value;
      // this.getTests();
    } else {
      this.searchbarform.markAllAsTouched();
    }
  }

  resetsearchbar() {
    window.location.reload();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.getTests();
  }

  onTableDataChange(event: any) {
    this.page = event;
    // this.getTests();
  }
}
