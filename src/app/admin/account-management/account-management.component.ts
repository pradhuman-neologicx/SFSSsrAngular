// src/app/components/account-management/account-management.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { NotificationService } from 'src/app/core/services/notificationnew.service';

interface Account {
  id: number;
  test_number: string;
  customer: { id: number; name: string };
  customer_id: number;
  work_name: string;
  created_at: string;
  assigned_at: string;
  assigned_to_user_id: number;
  assigned_user: { id: number; name: string };
  expected_delivery_date: string;
  is_complete: number;
  updated_at: string;
  payment: {
    status: 'paid' | 'pending';
    amount: number;
  };
}

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss'],
})
export class AccountManagementComponent implements OnInit {
  filteredAccounts: Account[] = [];
  tableSizes: number[] = [10, 25, 50, 100];
  tableSize: number = 10;
  page: number = 1;
  totalRecords: number = 0;
  searchbarform: FormGroup;
  accountForm: FormGroup;
  paymentForm!: FormGroup;
  showreset: boolean = false;
  showModal: boolean = false;
  showReportModal: boolean = false;
  showInvoiceModal: boolean = false;
  isAddMode: boolean = true;
  selectedAccount: Account | null = null;
  invoiceData: any = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private jwtService: JwtService,
    private notificationService: NotificationService
  ) {
    // Initialize search form
    this.searchbarform = this.fb.group({
      searchbar: [''],
    });

    // Initialize account form with validation
    this.accountForm = this.fb.group({
      clientName: ['', [Validators.required, Validators.minLength(2)]],
      contactEmail: ['', [Validators.required, Validators.email]],
      balance: [0, [Validators.required, Validators.min(0)]],
      creditLimit: [0, [Validators.required, Validators.min(0)]],
      paymentTerms: ['', Validators.required],
      status: ['', Validators.required],
      testType: ['', [Validators.required, Validators.minLength(2)]],
      testDate: [''],
      testStatus: [''],
    });

    // Initialize payment form with validation
    this.paymentForm = this.fb.group({
      totalAmount: ['', [Validators.required, Validators.min(0.01)]],
      paymentDate: ['', Validators.required],
      paymentMode: ['', Validators.required],
      referenceId: [''],
      notes: [''],
    });
  }

  user_id: any;
  ngOnInit(): void {
    this.user_id = this.jwtService.getpanelUserId();
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.isLoading = true;
    this.errorMessage = null;
    const searchTerm = this.searchbarform.get('searchbar')?.value || '';
    this.employeeService
      .getTestsByStatus(
        'completed',
        this.tableSize,
        this.page,
        searchTerm,
        this.user_id
      )
      .subscribe({
        next: (response: { data: { records: Account[]; total: number } }) => {
          // Map API response to ensure status field is set
          this.filteredAccounts = response.data.records.map((account) => ({
            ...account,
            status: account.is_complete === 1 ? 'Paid' : 'Unpaid', // Derive status if not provided
          }));
          this.totalRecords = response.data.total;
          this.isLoading = false;
        },
        error: (error: any) => {
          this.errorMessage = 'Failed to load accounts. Please try again.';
          this.isLoading = false;
          console.error('Error fetching accounts:', error);
        },
      });
  }

  onTableSizeChange(event: Event): void {
    this.tableSize = +(event.target as HTMLSelectElement).value;
    this.page = 1;
    this.loadAccounts();
  }

  onTableDataChange(page: number): void {
    this.page = page;
    this.loadAccounts();
  }

  searchfun(): void {
    this.page = 1;
    this.showreset = !!this.searchbarform.get('searchbar')?.value;
    this.loadAccounts();
  }

  resetsearchbar(): void {
    this.searchbarform.reset();
    this.showreset = false;
    this.page = 1;
    this.loadAccounts();
  }

  openInvoiceModal(account: Account): void {
    this.selectedAccount = account;
    this.employeeService.getTestReuestByID(account.id).subscribe({
      next: (response: { data: any }) => {
        // Map API response to match HTML structure with proper material grouping
        this.invoiceData = {
          testRequest: {
            id: response.data.id,
            user: response.data.customer.name,
            project: response.data.work_name,
            engineer: response.data.assigned_to.name,
          },
          customer: response.data.customer,
          work_name: response.data.work_name,
          assigned_to: response.data.assigned_to,
          materialTests: response.data.materials.map((material: any) => {
            // Calculate total rows for this material (sum of all input fields across all tests)
            const totalRows = material.tests.reduce(
              (sum: number, test: any) => sum + test.input_fields.length,
              0
            );

            return {
              material: material.material_name,
              sampleId: material.sample_id,
              totalRows: totalRows,
              tests: material.tests, // Keep tests array intact for nested display
            };
          }),
          fieldTests: response.data.fields.map((field: any) => ({
            testName: field.test_name,
            sampleId: field.sample_id,
            results: field.input_fields.map((inputField: any) => ({
              inputField: inputField.input_field_name,
              result: inputField.value,
              unit: inputField.uom_name,
              remarks: inputField.remarks,
            })),
          })),
        };
        this.showInvoiceModal = true;
      },
      error: (error) => {
        console.error('Error fetching invoice data:', error);
        this.errorMessage = 'Failed to load invoice data.';
        this.showInvoiceModal = true; // Show modal with fallback static data
      },
    });
  }
  closeInvoiceModal(): void {
    this.showInvoiceModal = false;
    this.selectedAccount = null;
    this.invoiceData = null;
  }
  selectedAccountId: any;
  openReportModal(account: Account): void {
    this.selectedAccountId = account.id;
    this.showReportModal = true;
    // Ensure paymentForm is reset and patched with default values
    this.paymentForm.reset();
    this.paymentForm.patchValue({
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMode: 'credit_card',
      referenceId: '',
      notes: '',
    });
  }

  closeReportModal(): void {
    this.showReportModal = false;
    this.selectedAccount = null;
  }

  closePaymentModal(): void {
    this.showReportModal = false;
    this.paymentForm.reset();
  }

  submitPayment(selectedAccountId: any): void {
    if (this.paymentForm.valid) {
      const paymentData = {
        test_request_id: selectedAccountId,
        user_id: this.user_id,
        amount: this.paymentForm.value.totalAmount,
        payment_method: this.paymentForm.value.paymentMode,
        transaction_id: null,
        payment_date: this.paymentForm.value.paymentDate,
        reference_id: this.paymentForm.value.referenceId,
        notes: this.paymentForm.value.notes,
        receipt: null,
      };
      this.employeeService.submitPayment(paymentData).subscribe({
        next: (response) => {
          this.closePaymentModal();
          this.loadAccounts();
          this.notificationService.show(response.message, 'success', 3000);
        },
        error: (error: any) => {
          console.error('Error submitting payment:', error);
          this.errorMessage = 'Failed to submit payment.';
          this.notificationService.show(
            'Failed to submit payment.',
            'error',
            3000
          );
        },
      });
    }
  }

  submitForm(): void {
    // if (this.accountForm.valid) {
    //   const accountData = this.accountForm.value;
    //   const apiCall = this.isAddMode
    //     ? this.accountService.addAccount(accountData)
    //     : this.accountService.updateAccount(this.selectedAccount!.id, accountData);
    //   apiCall.subscribe({
    //     next: () => {
    //       this.closeModal();
    //       this.loadAccounts();
    //     },
    //     error: (error) => {
    //       console.error('Error saving account:', error);
    //       this.errorMessage = 'Failed to save account.';
    //     },
    //   });
    // }
  }

  openModal(account?: Account): void {
    this.isAddMode = !account;
    this.showModal = true;
    if (account) {
      this.selectedAccount = account;
      this.accountForm.patchValue({
        clientName: account.customer.name,
        contactEmail: '', // Map if available in API
        balance: 0, // Map if available
        creditLimit: 0, // Map if available
        paymentTerms: '', // Map if available
        status: account.payment.status,
        testType: account.work_name,
        testDate: account.created_at.split('T')[0],
        testStatus: account.is_complete === 1 ? 'Completed' : 'Pending',
      });
    } else {
      this.accountForm.reset();
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedAccount = null;
    this.accountForm.reset();
  }

  downloadInvoiceAsPDF(): void {
    const element = document.getElementById('invoiceTable');
    if (element) {
      html2canvas(element, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 190; // Width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 10;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight + 10;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`invoice-${this.selectedAccount?.id}.pdf`);
      });
    }
  }
}
