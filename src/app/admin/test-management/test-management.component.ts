import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-test-management',
  templateUrl: './test-management.component.html',
  styleUrl: './test-management.component.scss',
  animations: [
    trigger('succesfullyMessage', [
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
    trigger('fadeIn', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'scale(0.5)',
        })
      ),
      transition(':enter', [
        animate(
          '0.5s ease-out',
          style({
            opacity: 1,
            transform: 'scale(1)',
          })
        ),
      ]),
    ]),
  ],
})
export class TestManagementComponent {
  activeTab: string = 'unassigned';
  showreset: boolean = false;
  searchText: string | undefined;
  tableSize: any = 10;
  tableSizes: any = [10, 20, 50, 100, 'all'];
  totalRecordsUnassigned: any;
  totalRecordsAssigned: any;
  totalRecordsCompleted: any;
  pageUnassigned: number = 1;
  pageAssigned: number = 1;
  pageCompleted: number = 1;
  searchbarform!: FormGroup;
  testCreateForm!: FormGroup;
  testViewForm!: FormGroup;
  assignForm!: FormGroup;
  testCreateOpen: boolean = false;
  testViewOpen: boolean = false;
  assignModalOpen: boolean = false;
  successMessage: string = '';
  openSuccessMessage: boolean = false;
  // unassignedTests: any[] = [];
  // assignedTests: any[] = [];
  // completedTests: any[] = [];
  selectedTests: any[] = [];
  // staffList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  user_id: any;
  ngOnInit(): void {
    this.user_id = this.jwtService.getpanelUserId();
    this.searchbarform = this.formBuilder.group({
      searchbar: ['', [Validators.required]],
    });
    this.testCreateForm = this.formBuilder.group({
      test_name: ['', [Validators.required]],
      client_name: ['', [Validators.required]],
      test_in: ['', [Validators.required]],
    });
    this.testViewForm = this.formBuilder.group({
      test_name: [''],
      client_name: [''],
      test_in: [''],
      assigned_to_name: [''],
      completed_on: [''],
    });
    this.assignForm = this.formBuilder.group({
      staff_id: [null, [Validators.required]],
    });

    this.loadTests();
    this.loadStaff();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.searchText = undefined;
    this.searchbarform.reset();
    this.showreset = false;
    this.loadTests();
  }

  loadTests() {
    if (this.activeTab === 'unassigned') {
      // this.employeeService
      //   .getTestsByStatus(
      //     'unassigned',
      //     this.tableSize,
      //     this.pageUnassigned,
      //     this.searchText
      //   )
      //   .subscribe((response: any) => {
      //     if (response.status === 200 || response.status === 201) {
      //       this.unassignedTests = response.data.records.map((test: any) => ({
      //         ...test,
      //         isSelected: false,
      //       }));
      //       this.totalRecordsUnassigned = response.data.total;
      //     }
      //   });
    } else if (this.activeTab === 'assigned') {
      // this.testService
      //   .getTestsByStatus(
      //     'assigned',
      //     this.tableSize,
      //     this.pageAssigned,
      //     this.searchText
      //   )
      //   .subscribe((response: any) => {
      //     if (response.status === 200 || response.status === 201) {
      //       this.assignedTests = response.data.records;
      //       this.totalRecordsAssigned = response.data.total;
      //     }
      //   });
    } else if (this.activeTab === 'completed') {
      // this.testService
      //   .getTestsByStatus(
      //     'completed',
      //     this.tableSize,
      //     this.pageCompleted,
      //     this.searchText
      //   )
      //   .subscribe((response: any) => {
      //     if (response.status === 200 || response.status === 201) {
      //       this.completedTests = response.data.records;
      //       this.totalRecordsCompleted = response.data.total;
      //     }
      //   });
    }
  }

  loadStaff() {
    this.employeeService;
    // .getStaff(100, 1, undefined, '1')
    // .subscribe((response: any) => {
    //   if (response.status === 200 || response.status === 201) {
    //     this.staffList = response.data.records.filter(
    //       (staff: any) => staff.is_active === 1
    //     );
    //   }
    // });
  }

  searchfun() {
    if (this.searchbarform.valid) {
      this.showreset = true;
      this.searchText = this.searchbarform.get('searchbar')?.value;
      this.loadTests();
    } else {
      this.searchbarform.markAllAsTouched();
    }
  }

  resetsearchbar() {
    this.searchText = undefined;
    this.searchbarform.reset();
    this.showreset = false;
    this.loadTests();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.pageUnassigned = 1;
    this.pageAssigned = 1;
    this.pageCompleted = 1;
    this.loadTests();
  }

  onTableDataChangeUnassigned(event: any) {
    this.pageUnassigned = event;
    this.loadTests();
  }

  onTableDataChangeAssigned(event: any) {
    this.pageAssigned = event;
    this.loadTests();
  }

  onTableDataChangeCompleted(event: any) {
    this.pageCompleted = event;
    this.loadTests();
  }

  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    this.unassignedTests.forEach((test: any) => (test.isSelected = checked));
    this.onTestSelect();
  }

  isAllSelected(): boolean {
    return (
      this.unassignedTests.length > 0 &&
      this.unassignedTests.every((test: any) => test.isSelected)
    );
  }

  onTestSelect() {
    this.selectedTests = this.unassignedTests.filter(
      (test: any) => test.isSelected
    );
  }

  openCreateModal() {
    this.router.navigate(['/test-management/create-test']);
  }

  openAssignModal() {
    this.assignModalOpen = true;
    this.assignForm.reset();
  }

  openViewModal(test: any) {
    this.testViewOpen = true;
    // this.testService.getTestById(test.id).subscribe((response: any) => {
    //   if (response.status === 200 || response.status === 201) {
    //     this.testViewForm.patchValue({
    //       test_name: response.data.test_name,
    //       client_name: response.data.client_name,
    //       test_in: this.formatDate(response.data.test_in),
    //       assigned_to_name: response.data.assigned_to_name || '',
    //       completed_on: response.data.completed_on
    //         ? this.formatDate(response.data.completed_on)
    //         : '',
    //     });
    //   }
    // });
  }

  formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${d.getFullYear()}`;
  }

  closeModal() {
    this.testCreateOpen = false;
    this.testViewOpen = false;
    this.assignModalOpen = false;
  }

  clickModalContent(event: Event): void {
    event.stopPropagation();
  }

  createTest() {
    // if (this.testCreateForm.valid) {
    //   const formData = new FormData();
    //   formData.append('test_name', this.testCreateForm.get('test_name')?.value);
    //   formData.append(
    //     'client_name',
    //     this.testCreateForm.get('client_name')?.value
    //   );
    //   formData.append('test_in', this.testCreateForm.get('test_in')?.value);
    //   this.testService.createTest(formData).subscribe({
    //     next: (response: any) => {
    //       if (response.status === 200 || response.status === 201) {
    //         this.closeModal();
    //         this.successMessage = 'Test Created';
    //         this.loadTests();
    //         setTimeout(() => {
    //           this.openSuccessMessage = true;
    //           setTimeout(() => {
    //             this.openSuccessMessage = false;
    //           }, 1000);
    //         }, 200);
    //       } else {
    //         this.errorMessage = response.message || 'Failed to create test';
    //         alert(this.errorMessage);
    //       }
    //     },
    //     error: (error: any) => {
    //       this.errorMessage = error.message || 'An error occurred';
    //       alert(this.errorMessage);
    //     },
    //   });
    // } else {
    //   this.testCreateForm.markAllAsTouched();
    //   this.errorMessage = 'Please fill all required fields';
    //   alert(this.errorMessage);
    // }
  }

  assignTests() {
    // if (this.assignForm.valid && this.selectedTests.length > 0) {
    //   const staffId = this.assignForm.get('staff_id')?.value;
    //   const testIds = this.selectedTests.map((test) => test.id);
    //   this.testService.assignTests(testIds, staffId).subscribe({
    //     next: (response: any) => {
    //       if (response.status === 200 || response.status === 201) {
    //         this.closeModal();
    //         this.successMessage = 'Tests Assigned';
    //         this.unassignedTests.forEach((test) => (test.isSelected = false));
    //         this.selectedTests = [];
    //         this.loadTests();
    //         setTimeout(() => {
    //           this.openSuccessMessage = true;
    //           setTimeout(() => {
    //             this.openSuccessMessage = false;
    //           }, 1000);
    //         }, 200);
    //       } else {
    //         this.errorMessage = response.message || 'Failed to assign tests';
    //         alert(this.errorMessage);
    //       }
    //     },
    //     error: (error: any) => {
    //       this.errorMessage = error.message || 'An error occurred';
    //       alert(this.errorMessage);
    //     },
    //   });
    // } else {
    //   this.assignForm.markAllAsTouched();
    //   this.errorMessage = 'Please select a staff member';
    //   alert(this.errorMessage);
    // }
  }
  markAsCompleted(testId: string) {
    // this.testService.completeTest(testId).subscribe({
    //   next: (response: any) => {
    //     if (response.status === '200' || response.status === '201') {
    //       this.successMessage = 'Test Completed';
    //       this.loadTests();
    //       setTimeout(() => {
    //         this.openSuccessMessage = true;
    //         setTimeout(() => {
    //           this.openSuccessMessage = false;
    //         }, 1000);
    //       }, 200);
    //     } else {
    //       this.errorMessage = response.message || 'Failed to complete test';
    //       alert(this.errorMessage);
    //     }
    //   },
    //   error: (error: any) => {
    //     this.errorMessage = error.message || 'An error occurred';
    //     alert(this.errorMessage);
    //   },
    // });
  }

  errorMessage?: string;
  staffList: any = [
    { id: '1', name: 'Dr. John Smith', is_active: 1 },
    { id: '2', name: 'Nurse Jane Doe', is_active: 1 },
    { id: '3', name: 'Technician Bob Johnson', is_active: 1 },
    { id: '4', name: 'Dr. Emily Brown', is_active: 1 },
    { id: '5', name: 'Nurse Mike Wilson', is_active: 0 },
  ];
  unassignedTests: any = [
    {
      id: '101',
      test_name: 'Fine Aggregate (Sand)',
      client_name: 'Alice Parker',
      test_in: '2025-05-20',
      isSelected: false,
    },
    {
      id: '102',
      test_name: 'Bitumen Mix Design',
      client_name: 'Tom Harris',
      test_in: '2025-05-21',
      isSelected: false,
    },
    {
      id: '103',
      test_name: 'Brick ',
      client_name: 'Arun',
      test_in: '2025-05-22',
      isSelected: false,
    },
  ];

  assignedTests: any = [
    {
      id: '201',
      test_name: 'Soil',
      client_name: 'David ',
      test_in: '2025-05-18',
      assigned_to_name: 'Dr. John Smith',
    },
    {
      id: '202',
      test_name: 'Bitumen Mix Design',
      client_name: 'Emma Watson',
      test_in: '2025-05-19',
      assigned_to_name: 'Jane Doe',
    },
  ];
  completedTests: any = [
    {
      id: '301',
      test_name: 'Field Tests',
      client_name: 'Michael Chen',
      test_in: '2025-05-15',
      assigned_to_name: 'Technician Bob Johnson',
      completed_on: '2025-05-16',
    },
    {
      id: '302',
      test_name: 'Steel',
      client_name: 'Lisa Adams',
      test_in: '2025-05-14',
      assigned_to_name: ' Emily Brown',
      completed_on: '2025-05-15',
    },
  ];
}
