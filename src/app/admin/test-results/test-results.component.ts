// test-results.component.ts
import { Component, OnInit,  Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/core/services/jwt.service';

interface TestResult {
  id: string;
  testName: string;
  testType: string;
  sampleId: string;
  status: 'completed' | 'pending';
  completedDate: Date;
  operator: string;
  results: { [key: string]: any };
  reportUrl?: string;
}

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss'],
})
export class TestResultsComponent {
  showreset: boolean = false;
  searchText: string | undefined;
  tableSize: any = 10;
  tableSizes: any = [10, 20, 50, 100, 'all'];
  totalRecords: any;
  page: number = 1;
  searchbarform!: FormGroup;
  selectedResult: TestResult | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private jwtService: JwtService,
     @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  testResults: TestResult[] = [
    {
      id: 'TS-2024-001',
      testName: 'Steel Rod Tensile Test',
      testType: 'Tensile Strength',
      sampleId: 'ST-001-A',
      status: 'completed',
      completedDate: new Date('2024-01-15T15:30:00'),
      operator: 'Dr. Sarah Johnson',
      results: {
        'Ultimate Tensile Strength': '520 MPa',
        'Yield Strength': '350 MPa',
        Elongation: '18%',
        'Modulus of Elasticity': '200 GPa',
      },
      reportUrl: '/reports/TS-2024-001.pdf',
    },
    {
      id: 'CT-2024-002',
      testName: 'Concrete Compression',
      testType: 'Compression Test',
      sampleId: 'CC-002-B',
      status: 'completed',
      completedDate: new Date('2024-01-14T11:45:00'),
      operator: 'Mike Chen',
      results: {
        'Compressive Strength': '35 MPa',
        'Modulus of Elasticity': '30 GPa',
        'Max Load': '785 kN',
      },
    },
    {
      id: 'HT-2024-003',
      testName: 'Aluminum Hardness',
      testType: 'Hardness Test',
      sampleId: 'AL-003-C',
      status: 'pending',
      completedDate: new Date('2024-01-13T14:20:00'),
      operator: 'Lisa Rodriguez',
      results: {
        'Brinell Hardness': '95 HB',
        'Test Load': '2.5 kN',
        'Indentation Diameter': '3.2 mm',
      },
    },
    {
      id: 'IT-2024-004',
      testName: 'Polymer Impact Test',
      testType: 'Impact Test',
      sampleId: 'PL-004-D',
      status: 'pending',
      completedDate: new Date('2024-01-12T16:10:00'),
      operator: 'Dr. Robert Kim',
      results: {
        'Impact Energy': '12 J',
        'Required Minimum': '15 J',
        'Fracture Type': 'Brittle',
      },
    },
  ];
  user_id: any;
  ngOnInit(): void {
    this.user_id = this.jwtService.getpanelUserId();
    this.searchbarform = this.formBuilder.group({
      searchbar: ['', [Validators.required]],
    });
  }
  viewDetails(result: TestResult): void {
    this.selectedResult = result;
  }

  closeDetails(): void {
    this.selectedResult = null;
  }

  getResultEntries(results: {
    [key: string]: any;
  }): { key: string; value: any }[] {
    return Object.entries(results).map(([key, value]) => ({ key, value }));
  }

  searchfun() {
    if (this.searchbarform.valid) {
      this.showreset = true;
      this.searchText = this.searchbarform.get('searchbar')?.value;
    } else {
      this.searchbarform.markAllAsTouched();
    }
  }

 resetsearchbar(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.location.reload();
    }
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
}
