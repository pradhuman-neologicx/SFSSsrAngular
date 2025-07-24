import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { JwtService } from 'src/app/core/services/jwt.service';

interface FinancialAccount {
  id: string;
  clientName: string;
  balance: number;
  creditLimit: number;
  paymentTerms: 'Net 30' | 'Net 60' | 'Prepaid';
  status: 'Paid' | 'Unpaid';
  lastInvoiceDate: Date | null;
  contactEmail: string;
  testType?: string;
  testDate?: Date | null;
  testStatus?: 'Completed' | 'Pending' | 'Failed';
}

interface ReportData {
  sampleId: string;
  jobNo: string;
  brand: string;
  steelType: string;
  receiptDate: string;
  testDetails: {
    diameter: string;
    weight: string;
    length: string;
    massPerMeter: string;
    crossSectionalArea: string;
    initialGaugeLength: string;
    yieldPoint: string;
    ultimateTensileLoad: string;
    yieldStress: string;
    ultimateTensileStrength: string;
    originalGaugeLength: string;
    elongationPercentage: string;
    bendTest: string;
  };
  testedBy: string;
  checkedBy: string;
  witnessBy: string;
}

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss'],
})
export class AccountManagementComponent {
  accounts: FinancialAccount[] = [
    {
      id: 'ACC-001',
      clientName: 'Acme Industries',
      balance: 2500.75,
      creditLimit: 10000,
      paymentTerms: 'Net 30',
      status: 'Paid',
      lastInvoiceDate: new Date('2025-06-15'),
      contactEmail: 'billing@acme.com',
      testType: 'Material Test',
      testDate: new Date('2025-06-10'),
      testStatus: 'Completed',
    },
    {
      id: 'ACC-002',
      clientName: 'Beta Labs',
      balance: 7500.2,
      creditLimit: 5000,
      paymentTerms: 'Net 60',
      status: 'Unpaid',
      lastInvoiceDate: new Date('2025-05-01'),
      contactEmail: 'finance@betalabs.com',
      testType: 'Field Test',
      testDate: new Date('2025-04-25'),
      testStatus: 'Pending',
    },
    {
      id: 'ACC-003',
      clientName: 'Gamma Research',
      balance: 0,
      creditLimit: 2000,
      paymentTerms: 'Prepaid',
      status: 'Paid',
      lastInvoiceDate: new Date('2025-05-15'),
      contactEmail: 'accounts@gammaresearch.com',
      testType: 'Material Test',
      testDate: new Date('2025-05-10'),
      testStatus: 'Completed',
    },
    {
      id: 'ACC-004',
      clientName: 'Delta Corp',
      balance: 1200.5,
      creditLimit: 3000,
      paymentTerms: 'Net 30',
      status: 'Paid',
      lastInvoiceDate: new Date('2025-04-10'),
      contactEmail: 'payments@deltacorp.com',
      testType: 'Field Test',
      testDate: new Date('2025-04-05'),
      testStatus: 'Pending',
    },
  ];

  filteredAccounts: FinancialAccount[] = [...this.accounts];
  accountForm: FormGroup;
  searchbarform: FormGroup;
  reportData: ReportData;
  selectedAccount: FinancialAccount | null = null;
  isAddMode: boolean = true;
  showModal: boolean = false;
  showReportModal: boolean = false;
  showInvoiceModal: boolean = false;
  showreset: boolean = false;
  tableSize: any = 10;
  tableSizes: any = [10, 20, 50, 100, 'all'];
  totalRecords: any;
  page: number = 1;
  user_id: any;

  constructor(
    private formBuilder: FormBuilder,
    private jwtService: JwtService
  ) {
    this.accountForm = this.formBuilder.group({
      clientName: ['', [Validators.required, Validators.minLength(2)]],
      balance: [0, [Validators.required, Validators.min(0)]],
      creditLimit: [0, [Validators.required, Validators.min(0)]],
      paymentTerms: ['Net 30', Validators.required],
      status: ['Active', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      testType: ['', Validators.minLength(2)],
      testDate: [null],
      testStatus: [''],
    });

    this.searchbarform = this.formBuilder.group({
      searchbar: ['', [Validators.required]],
    });

    this.reportData = {
      sampleId: 'S12345',
      jobNo: 'J98765',
      brand: 'BrandX',
      steelType: 'TMT Fe500',
      receiptDate: '2025-05-30',
      testDetails: {
        diameter: '20 mm',
        weight: '2.47 kg',
        length: '1 m',
        massPerMeter: '2.47 kg/m',
        crossSectionalArea: '314.16 mm²',
        initialGaugeLength: '56.5 mm',
        yieldPoint: '40 kN',
        ultimateTensileLoad: '60 kN',
        yieldStress: '127.3 N/mm²',
        ultimateTensileStrength: '190.9 N/mm²',
        originalGaugeLength: '56.5 mm',
        elongationPercentage: '20%',
        bendTest: 'Pass',
      },
      testedBy: 'John Doe',
      checkedBy: 'Jane Smith',
      witnessBy: 'Mike Johnson',
    };

    this.totalRecords = this.accounts.length;
  }

  ngOnInit(): void {
    this.user_id = this.jwtService.getpanelUserId();
  }

  searchfun(): void {
    if (this.searchbarform.valid) {
      this.showreset = true;
      const searchText = this.searchbarform
        .get('searchbar')
        ?.value.toLowerCase();
      this.filteredAccounts = this.accounts.filter(
        (account) =>
          account.clientName.toLowerCase().includes(searchText) ||
          account.id.toLowerCase().includes(searchText) ||
          account.testType?.toLowerCase().includes(searchText) ||
          account.testStatus?.toLowerCase().includes(searchText)
      );
      this.totalRecords = this.filteredAccounts.length;
      this.page = 1;
    } else {
      this.searchbarform.markAllAsTouched();
    }
  }

  resetsearchbar(): void {
    this.searchbarform.reset();
    this.showreset = false;
    this.filteredAccounts = [...this.accounts];
    this.totalRecords = this.accounts.length;
    this.page = 1;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.totalRecords = this.filteredAccounts.length;
  }

  onTableDataChange(event: any): void {
    this.page = event;
  }

  openAddAccountModal(): void {
    this.isAddMode = true;
    this.accountForm.reset({
      balance: 0,
      creditLimit: 0,
      paymentTerms: 'Net 30',
      status: 'Active',
      testType: '',
      testDate: null,
      testStatus: '',
    });
    this.showModal = true;
  }

  openEditAccountModal(account: FinancialAccount): void {
    this.isAddMode = false;
    this.selectedAccount = account;
    this.accountForm.patchValue(account);
    this.showModal = true;
  }

  openReportModal(account: FinancialAccount): void {
    this.selectedAccount = account;
    this.showReportModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedAccount = null;
    this.accountForm.reset();
  }

  closeReportModal(): void {
    this.showReportModal = false;
    this.selectedAccount = null;
  }

  submitForm(): void {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }

    const formValue = this.accountForm.value;
    if (this.isAddMode) {
      const newAccount: FinancialAccount = {
        id: `ACC-${(this.accounts.length + 1).toString().padStart(3, '0')}`,
        ...formValue,
        lastInvoiceDate: null,
      };
      this.accounts.push(newAccount);
    } else if (this.selectedAccount) {
      const index = this.accounts.findIndex(
        (a) => a.id === this.selectedAccount!.id
      );
      this.accounts[index] = { ...this.selectedAccount, ...formValue };
    }

    this.filteredAccounts = [...this.accounts];
    this.totalRecords = this.accounts.length;
    this.closeModal();
  }

  sendInvoice(account: FinancialAccount): void {
    console.log(
      `Sending invoice for account ${account.id} to ${account.contactEmail}`
    );
  }

  downloadReportAsPDF(): void {
    const element = document.getElementById('reportTable');
    if (element) {
      html2canvas(element, { scale: 2 })
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgWidth = 190;
          const pageHeight = 297;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;
          let position = 10;

          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight - 20;

          while (heightLeft > 0) {
            position = heightLeft - imgHeight + 10;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight - 20;
          }

          pdf.save('lab-report.pdf');
        })
        .catch((error: any) => {
          console.error('Error generating PDF:', error);
        });
    } else {
      console.error('Report table element not found');
    }
  }

  openInvoiceModal(account: FinancialAccount): void {
    this.selectedAccount = account;
    this.showInvoiceModal = true;
  }

  closeInvoiceModal(): void {
    this.showInvoiceModal = false;
    this.selectedAccount = null;
  }

  downloadInvoiceAsPDF(): void {
    const element = document.getElementById('invoiceTable');
    if (element) {
      setTimeout(() => {
        html2canvas(element, { scale: 2 })
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 10;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight - 20;

            while (heightLeft > 0) {
              position = heightLeft - imgHeight + 10;
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
              heightLeft -= pageHeight - 20;
            }

            pdf.save(`invoice-${this.selectedAccount?.id}.pdf`);
          })
          .catch((error: any) => {
            console.error('Error generating invoice PDF:', error);
          });
      }, 500);
    } else {
      console.error('Invoice table element not found');
    }
  }
}
