import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ChangeDetectorRef, Component, input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { NotificationService } from 'src/app/core/services/notificationnew.service';

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
export class TestManagementComponent implements OnInit {
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

  updateAssignModalOpen = false;
  updateAssignForm!: FormGroup;
  updateAssignTestId: number | null = null;

  deleteTestModalOpen: boolean = false;
  completeTestModalOpen: boolean = false;
  testIdToDelete: string | null = null;
  testIdToComplete: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private jwtService: JwtService,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
    private router: Router // private fb: FormBuilder
  ) {}

  user_id: any;
  userRole: any;
  ngOnInit(): void {
    this.userRole = localStorage.getItem('Role');
    console.log('User Role:', this.userRole);
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
      round_robin: [false],
      staff_id: [{ value: null, disabled: false }], // Initially enabled
    });
    this.updateAssignForm = this.formBuilder.group({
      round_robin: [false],
      staff_id: [{ value: null, disabled: false }], // Initially enabled
    });
    // this.fillDetailsForm = this.formBuilder.group({
    //   test_type: [''],
    //   select_material: [''],
    //   test_name: [''],
    //   test_method_name: [''],
    // });
    this.fillDetailsForm = this.formBuilder.group({});
    this.loadTests();
    this.getEngineers();
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
      this.employeeService
        .getTestsByStatus(
          'unassigned',
          this.tableSize,
          this.pageUnassigned,
          this.searchText,
          this.user_id
        )
        .subscribe((response: any) => {
          if (response.status === 200 || response.status === 201) {
            this.unassignedTests = response.data.records.map((test: any) => ({
              ...test,
              isSelected: false,
            }));
            this.totalRecordsUnassigned = response.data.total;
          }
        });
    } else if (this.activeTab === 'assigned') {
      this.employeeService
        .getTestsByStatus(
          'assigned',
          this.tableSize,
          this.pageAssigned,
          this.searchText,

          this.user_id
        )
        .subscribe((response: any) => {
          if (response.status === 200 || response.status === 201) {
            this.assignedTests = response.data.records;
            this.totalRecordsAssigned = response.data.total;
          }
        });
    } else if (this.activeTab === 'completed') {
      this.employeeService
        .getTestsByStatus(
          'completed',
          this.tableSize,
          this.pageCompleted,
          this.searchText,
          this.user_id
        )
        .subscribe((response: any) => {
          if (response.status === 200 || response.status === 201) {
            this.completedTests = response.data.records;
            this.totalRecordsCompleted = response.data.total;
          }
        });
    }
  }
  openEditModal(testId: any) {
    this.router.navigate(['/admin/update-test/' + testId]);
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
      this.unassignedTests &&
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

  openUpdateAssign(testId: number) {
    this.updateAssignTestId = testId;
    this.updateAssignForm.reset();
    this.updateAssignModalOpen = true;
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
    this.updateAssignModalOpen = false;
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
    if (this.selectedTests.length === 0) {
      this.errorMessage = 'Please select at least one test to assign';
      alert(this.errorMessage);
      return;
    }

    const isRoundRobin = this.assignForm.get('round_robin')?.value;
    const staffId = this.assignForm.get('staff_id')?.value;

    if (!isRoundRobin && !staffId) {
      this.assignForm.markAllAsTouched();
      this.errorMessage = 'Please select either Auto Select or an employee';
      alert(this.errorMessage);
      return;
    }

    const mode = isRoundRobin ? 'auto' : 'manual';
    const test_request_ids = this.selectedTests.map((test) => test.id);
    const body: any = {
      test_request_ids,
      mode,
    };

    if (mode === 'manual') {
      body.user_id = staffId;
    }

    this.employeeService.assignTestRequest(body).subscribe({
      next: (response: any) => {
        this.errorMessage = response.message;
        if (response.status === 200 || response.status === 201) {
          this.closeModal();
          this.successMessage = 'Tests Assigned';
          this.unassignedTests.forEach((test) => (test.isSelected = false));
          this.selectedTests = [];
          this.loadTests();
          setTimeout(() => {
            this.openSuccessMessage = true;
            setTimeout(() => {
              this.openSuccessMessage = false;
            }, 1000);
          }, 200);
        } else {
          this.errorMessage = response.message || 'Failed to assign tests';
          this.notificationService.show(response.message, 'success', 3000);
        }
      },
      error: (error: any) => {
        const errorMessage =
          error.error?.message ||
          'An error occurred while assigning tests, Test Requests have incomplete checklists, Please Checklist';
        this.errorMessage = errorMessage;
        this.notificationService.show(errorMessage, 'error', 3000);
      },
    });
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
  staffList: any[] = [];
  unassignedTests: any[] = [];

  assignedTests: any;
  completedTests: any = [];

  updateAssign() {
    if (this.updateAssignForm.invalid || this.updateAssignTestId == null) {
      this.updateAssignForm.markAllAsTouched();
      return;
    }
    const isRoundRobin = this.updateAssignForm.get('round_robin')?.value;
    const mode = isRoundRobin ? 'auto' : 'manual';

    // Collect all selected test IDs (multiple allowed)
    const test_request_ids = [this.updateAssignTestId];

    // Construct request body
    const body: any = {
      test_request_ids,
      mode,
    };

    // Add user_id only if mode is manual
    if (mode == 'manual') {
      body.user_id = this.updateAssignForm.get('staff_id')?.value;
    }

    this.employeeService.assignTestRequest(body).subscribe({
      next: (response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.closeUpdateAssignModal();
          this.successMessage = 'Tests Assigned';
          this.unassignedTests.forEach((test) => (test.isSelected = false));
          this.selectedTests = [];
          this.loadTests();
          setTimeout(() => {
            this.openSuccessMessage = true;
            setTimeout(() => {
              this.openSuccessMessage = false;
            }, 1000);
          }, 200);
        } else {
          this.errorMessage = response.message || 'Failed to assign tests';
          alert(this.errorMessage);
        }
      },
      error: (error: any) => {
        this.errorMessage = error.message || 'An error occurred';
        alert(this.errorMessage);
      },
    });
  }

  closeUpdateAssignModal() {
    this.updateAssignModalOpen = false;
  }
  getEngineers() {
    this.employeeService.GetEngineersAPI().subscribe((response: any) => {
      if (response.status === 200 || response.status === 201) {
        this.staffList = response.data;
      }
    });
  }

  onAutoSelectChange(formType: 'assign' | 'update') {
    const form =
      formType === 'assign' ? this.assignForm : this.updateAssignForm;
    const roundRobinControl = form.get('round_robin');
    const staffIdControl = form.get('staff_id');

    if (roundRobinControl?.value) {
      // Auto Select is checked
      staffIdControl?.setValue(null); // Clear staff_id
      staffIdControl?.disable(); // Disable staff_id control
      staffIdControl?.clearValidators(); // Remove validators
    } else {
      // Auto Select is unchecked
      staffIdControl?.enable(); // Enable staff_id control
      staffIdControl?.setValidators([Validators.required]); // Add required validator
    }
    staffIdControl?.updateValueAndValidity(); // Update control state
  }

  onManualSelectChange(formType: 'assign' | 'update') {
    const form =
      formType === 'assign' ? this.assignForm : this.updateAssignForm;
    const roundRobinControl = form.get('round_robin');
    const staffIdControl = form.get('staff_id');

    if (staffIdControl?.value) {
      // Manual selection is made
      roundRobinControl?.setValue(false); // Uncheck Auto Select
      staffIdControl?.setValidators([Validators.required]); // Ensure required validator
    } else {
      // No staff selected
      staffIdControl?.clearValidators(); // Clear validators if no selection
    }
    staffIdControl?.updateValueAndValidity(); // Update control state
  }

  fillDetailsModalOpen: boolean = false;
  fillDetailsForm!: FormGroup;
  dynamicInputFields: string[] = [];
  canAddField: boolean = true;
  currentTest: any;
  materials: any[] = [];
  fields: any[] = [];
  materialTests: {
    [key: number]: {
      name: string;
      controlName: string;
      uom: string;
      remarks: any;
      value: any;
    }[];
  } = {};
  openFillDetailsModal(test: any) {
    this.currentTest = test; // Store the entire test object
    this.fillForTestById(test.id);

    // Initialize materialTests and form
    this.materials = test.materials || [];
    this.fields = test.fields || [];
    this.materialTests = {};
    this.fillDetailsForm = this.formBuilder.group({});

    // Add material-based test controls
    this.materials.forEach((material) => {
      if (material.tests && material.tests.length > 0) {
        material.tests.forEach((test: any) => {
          const inputFields = test.input_fields || [];
          inputFields.forEach((input: any) => {
            if (input.id) {
              const valueControlName = `material_${material.material_id}_test_${test.test_configuration_id}_input_${input.id}`;
              const remarksControlName = `material_${material.material_id}_test_${test.test_configuration_id}_remarks_${input.id}`;
              if (!this.materialTests[material.material_id]) {
                this.materialTests[material.material_id] = [];
              }
              this.materialTests[material.material_id].push({
                name: input.input_field_name,
                controlName: valueControlName,
                uom: input.uom_name,
                remarks: input.remarks,
                value: input.value,
              });
              this.fillDetailsForm.addControl(
                valueControlName,
                new FormControl(input.value || '')
              );
              this.fillDetailsForm.addControl(
                remarksControlName,
                new FormControl(input.remarks || '')
              );
            }
          });
        });
      }
    });

    // Add field-based test controls
    this.fields.forEach((field) => {
      if (field.input_fields && field.input_fields.length > 0) {
        field.input_fields.forEach((input: any) => {
          if (input.id) {
            const valueControlName = `field_${field.field_id}_${input.id}`;
            const remarksControlName = `field_${field.field_id}_remarks_${input.id}`;
            this.fillDetailsForm.addControl(
              valueControlName,
              new FormControl(input.value || '')
            );
            this.fillDetailsForm.addControl(
              remarksControlName,
              new FormControl(input.remarks || '')
            );
          }
        });
      } else {
        console.warn(`No input_fields for field_id: ${field.field_id}`);
      }
    });

    console.log('Form Controls:', this.fillDetailsForm.controls); // Debug log
  }

  getControlName(id: number, testName: string): string {
    // Handle material-based tests
    if (this.materials.some((m) => m.material_id === id)) {
      const control = this.materialTests[id]?.find(
        (t) => t.name === testName
      )?.controlName;
      return control || '';
    }
    // Handle field-based tests
    const field = this.fields.find((f) => f.field_id === id);
    if (field) {
      const input = field.input_fields.find(
        (i: any) => i.input_field_name === testName
      );
      if (input) {
        return `field_${id}_${input.id}`;
      }
    }
    console.warn(`Control name not found for id: ${id}, testName: ${testName}`);
    return '';
  }
  getControlNamemaT(id: any, TestConfigID: any, testName: string): string {
    // Handle material-based tests
    if (this.materials.some((m) => m.material_id === id)) {
      const control = this.materialTests[id]?.find(
        (t) => t.name === testName
      )?.controlName;
      return control || '';
    }
    // Handle field-based tests
    const field = this.fields.find((f) => f.field_id === id);
    if (field) {
      const input = field.input_fields.find(
        (i: any) => i.input_field_name === testName
      );
      if (input) {
        return `field_${id}_${input.id}`;
      }
    }
    console.warn(`Control name not found for id: ${id}, testName: ${testName}`);
    return '';
  }
  saveTestDetails() {
    // Check if there is at least one material or field with data
    const hasMaterials = this.materials.length > 0;
    const hasFields = this.fields.length > 0;

    // Validate form only for the sections that have data
    const formData = this.fillDetailsForm.value;
    let isFormValid = true;

    // If there are materials, validate their inputs
    if (hasMaterials) {
      this.materials.forEach((material) => {
        material.tests?.forEach((test: any) => {
          test.input_fields?.forEach((input: any) => {
            const valueControlName = `material_${material.material_id}_test_${test.test_configuration_id}_input_${input.id}`;
            if (this.fillDetailsForm.get(valueControlName)?.invalid) {
              isFormValid = false;
            }
          });
        });
      });
    }

    // If there are fields, validate their inputs
    if (hasFields) {
      this.fields.forEach((field) => {
        field.input_fields?.forEach((input: any) => {
          const valueControlName = `field_${field.field_id}_${input.id}`;
          if (this.fillDetailsForm.get(valueControlName)?.invalid) {
            isFormValid = false;
          }
        });
      });
    }

    // Proceed if there is at least one section with data and the form is valid for those sections
    if ((hasMaterials || hasFields) && isFormValid) {
      const testRequestId = this.currentTest?.id;
      const engineerId = this.currentTest?.assigned_to?.id;

      // Initialize the output object
      const result: any = {
        test_request_id: testRequestId,
        engineer_id: engineerId,
        _method: 'PUT',
        materials: [],
        fields: [],
      };

      // Process material-based tests
      const materialMap: { [key: number]: any } = {};

      if (hasMaterials) {
        this.materials.forEach((material) => {
          const materialEntry: any = {
            material_id: material.material_id,
            configurations: [],
          };

          material.tests?.forEach((test: any) => {
            const configEntry: any = {
              test_configuration_id: test.test_configuration_id,
              inputs: [],
            };

            test.input_fields?.forEach((input: any) => {
              const valueControlName = `material_${material.material_id}_test_${test.test_configuration_id}_input_${input.id}`;
              const remarksControlName = `material_${material.material_id}_test_${test.test_configuration_id}_remarks_${input.id}`;

              configEntry.inputs.push({
                input_field_name: input.input_field_name,
                uom_id: input.uom_id, // Fallback to mapping uom_name if uom_id is unavailable
                value: formData[valueControlName] || null,
                remarks: formData[remarksControlName] || null,
              });
            });

            if (configEntry.inputs.length > 0) {
              materialEntry.configurations.push(configEntry);
            }
          });

          if (materialEntry.configurations.length > 0) {
            materialMap[material.material_id] = materialEntry;
          }
        });

        result.materials = Object.values(materialMap);
      }

      // Process field-based tests
      const fieldMap: { [key: number]: any } = {};

      if (hasFields) {
        this.fields.forEach((field) => {
          const fieldEntry: any = {
            field_id: field.field_id,
            test_configuration_id: field.test_configuration_id || null, // Adjust based on your data structure
            inputs: [],
          };

          field.input_fields?.forEach((input: any) => {
            const valueControlName = `field_${field.field_id}_${input.id}`;
            const remarksControlName = `field_${field.field_id}_remarks_${input.id}`;

            fieldEntry.inputs.push({
              input_field_name: input.input_field_name,
              uom_id: input.uom_id, // Fallback to mapping uom_name if uom_id is unavailable
              value: formData[valueControlName] || null,
              remarks: formData[remarksControlName] || null,
            });
          });

          if (fieldEntry.inputs.length > 0) {
            fieldMap[field.field_id] = fieldEntry;
          }
        });

        result.fields = Object.values(fieldMap);
      }

      // Log the formatted data
      console.log('Saved Test Details:', JSON.stringify(result, null, 2));

      // Send data to backend
      this.employeeService.saveTestDetails(result, testRequestId).subscribe({
        next: (response: any) => {
          if (response.status === 200 || response.status === 201) {
            console.log('Test details saved successfully:', response);
            // Close the modal and show success message
            this.closeFillDetailsModal();
            this.successMessage = 'Test Details Saved';
            setTimeout(() => {
              this.openSuccessMessage = true;
              setTimeout(() => {
                this.openSuccessMessage = false;
              }, 1000);
            }, 200);
          } else {
            this.errorMessage =
              response.message || 'Failed to save test details';
            alert(this.errorMessage);
          }
        },
        error: (error: any) => {
          this.errorMessage = error.message || 'An error occurred';
          alert(this.errorMessage);
        },
      });
    } else {
      // If no materials or fields, or form is invalid, show error
      this.fillDetailsForm.markAllAsTouched();
      this.errorMessage =
        !hasMaterials && !hasFields
          ? 'No materials or fields provided'
          : 'Please fill all required fields';
      alert(this.errorMessage);
      console.log(
        'Form is invalid or no data provided. Touched controls:',
        this.fillDetailsForm.controls
      );
    }
  }

  closeFillDetailsModal() {
    this.fillDetailsModalOpen = false;
    this.fillDetailsForm.reset();
  }

  // delete
  openCompleteTestModal(testId: string) {
    this.testIdToComplete = testId;
    this.completeTestModalOpen = true;
    console.log('Opening delete modal for test ID:', testId);
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }
  openDeleteTestModal(testId: string) {
    this.testIdToDelete = testId;
    this.deleteTestModalOpen = true;
    console.log('Opening delete modal for test ID:', testId);
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

  closeCompleteTestModal() {
    this.completeTestModalOpen = false;
    this.testIdToComplete = null;
  }
  closeDeleteTestModal() {
    this.deleteTestModalOpen = false;
    this.testIdToDelete = null;
  }

  completeTest(testId: any) {
    if (!testId) return;

    this.employeeService.completeTestRequest(testId).subscribe({
      next: (response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.successMessage = 'Test Deleted';
          this.loadTests();
          setTimeout(() => {
            this.openSuccessMessage = true;
            setTimeout(() => {
              this.openSuccessMessage = false;
            }, 1000);
          }, 200);
        } else {
          this.errorMessage = response.message || 'Failed to delete test';
          alert(this.errorMessage);
        }
      },
      error: (error: any) => {
        this.errorMessage = error.message || 'An error occurred';
        alert(this.errorMessage);
      },
    });
    this.closeCompleteTestModal();
    // Optionally show a success message
  }
  deleteTest(testId: any) {
    if (!testId) return;

    this.employeeService.deleteTestRequest(testId).subscribe({
      next: (response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.successMessage = 'Test Deleted';
          this.loadTests();
          setTimeout(() => {
            this.openSuccessMessage = true;
            setTimeout(() => {
              this.openSuccessMessage = false;
            }, 1000);
          }, 200);
        } else {
          this.errorMessage = response.message || 'Failed to delete test';
          alert(this.errorMessage);
        }
      },
      error: (error: any) => {
        this.errorMessage = error.message || 'An error occurred';
        alert(this.errorMessage);
      },
    });
    this.closeDeleteTestModal();
    // Optionally show a success message
  }

  // fill for test by id
  fillForTestById(testId: string) {
    this.employeeService.getTestReuestByID(testId).subscribe({
      next: (response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.currentTest = response.data;
          this.materials = this.currentTest.materials || [];
          this.fields = this.currentTest.fields || [];
          this.materialTests = {};
          this.fillDetailsForm = this.formBuilder.group({});

          // Material-based test controls
          this.materials.forEach((material) => {
            if (material.tests && material.tests.length > 0) {
              material.tests.forEach((test: any) => {
                const inputFields = test.input_fields || [];
                inputFields.forEach((input: any) => {
                  if (input.id) {
                    const valueControlName = `material_${material.material_id}_test_${test.test_configuration_id}_input_${input.id}`;
                    const remarksControlName = `material_${material.material_id}_test_${test.test_configuration_id}_remarks_${input.id}`;
                    if (!this.materialTests[material.material_id]) {
                      this.materialTests[material.material_id] = [];
                    }
                    this.materialTests[material.material_id].push({
                      name: input.input_field_name,
                      controlName: valueControlName,
                      uom: input.uom_name,
                      remarks: input.remarks,
                      value: input.value,
                    });
                    this.fillDetailsForm.addControl(
                      valueControlName,
                      new FormControl(input.value || '')
                    );
                    this.fillDetailsForm.addControl(
                      remarksControlName,
                      new FormControl(input.remarks || '')
                    );
                  } else {
                    console.warn(
                      `Material input field missing id for material_id: ${material.material_id}, input:`,
                      input
                    );
                  }
                });
              });
            }
          });

          // Field-based test controls
          this.fields.forEach((field) => {
            if (field.input_fields && field.input_fields.length > 0) {
              field.input_fields.forEach((input: any) => {
                if (input.id) {
                  const controlName = `field_${field.field_id}_${input.id}`;
                  const remarksControlName = `field_${field.field_id}_remarks_${input.id}`;
                  this.fillDetailsForm.addControl(
                    controlName,
                    new FormControl(input.value || '')
                  );
                  this.fillDetailsForm.addControl(
                    remarksControlName,
                    new FormControl(input.remarks || '')
                  );
                }
              });
            }
          });

          // Only open modal after controls are set up
          this.fillDetailsModalOpen = true;
          this.cdr.detectChanges();
        }
      },
      error: (error: any) => {
        console.error('Error fetching test details:', error);
        this.fillDetailsModalOpen = false;
      },
    });
  }

  // Helper to get UOM for a control
  getUomForControl(materialId: number, controlName: string): string {
    const material = this.materialTests[materialId];
    if (!material) return '';
    const found = material.find((t: any) => t.controlName === controlName);
    return found ? found.uom : '';
  }

  // Helper to get remarks for a control
  getRemarksForControl(materialId: number, controlName: string): string {
    const material = this.materialTests[materialId];
    if (!material) return '';
    const found = material.find((t: any) => t.controlName === controlName);
    return found ? found.remarks : '';
  }

  getMaterialRowspan(material: any): number {
    if (!material || !material.tests) return 1;
    return material.tests
      .map((t: any) => t.input_fields?.length || 1)
      .reduce((sum: number, len: number) => sum + len, 0);
  }

  // store fill form data
}
