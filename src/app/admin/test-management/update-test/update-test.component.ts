import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notificationnew.service';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.scss'],
  animations: [
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
          '0.7s ease-out',
          style({
            transform: 'translateX(0)',
            opacity: 1,
          })
        ),
      ]),
    ]),
  ],
})
export class UpdateTestComponent implements OnInit {
  currentStep: number = 1;
  step1Form!: FormGroup;
  step2Form!: FormGroup;
  successMessage: string = '';
  openSuccessMessage: boolean = false;
  errorMessage?: string;
  testId: any = null;
  today: any;
  dropdownOpen: boolean[] = [];
  hasDuplicateMaterials: boolean = false;

  materials: any;
  existingCustomers: any;
  testDescriptions: any[] = [];
  fieldTest: any;
  filteredTestDescriptions: any[][] = [];

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.today = new Date().toISOString().split('T')[0];
  }
  test_id!: string;
  ngOnInit(): void {
    this.test_id = this.route.snapshot.paramMap.get('id')!;
    console.log('Extracted ID:', this.test_id);
    const defaultDate = '2025-05-30';
    this.step1Form = this.formBuilder.group(
      {
        test_request_no: [{ value: '', disabled: true }],
        customer_type: ['', Validators.required],
        name_of_customer: [''],
        name_of_existing_customer: [''],
        address: [''],
        date: [defaultDate, Validators.required],
        email: [''],
        mobile_no: ['', [Validators.pattern('[0-9]{10}')]],
        name_of_work_project: ['', Validators.required],
        expected_date_of_delivery: [
          '',
          [Validators.required, this.minDateValidator()],
        ],
        materialTests: this.formBuilder.array(
          [],
          this.duplicateMaterialValidator()
        ),
        fieldTests: this.formBuilder.array([]),
      },
      { validators: this.atLeastOneTestValidator() }
    );

    this.step2Form = this.formBuilder.group({
      sample_proper_label: ['', Validators.required],
      sample_appropriate_quantity: ['', Validators.required],
      sample_packed_sealed_properly: ['', Validators.required],
      sample_condition: ['', Validators.required],
      sample_condition_reason: [''],
      requirements_defined_documented: ['', Validators.required],
      requirements_adequate: ['', Validators.required],
      test_method_capability: ['', Validators.required],
      tests_per_nabl_scope: ['', Validators.required],
      tests_witnessed_by_customer: ['', Validators.required],
      decision_rule_required: ['', Validators.required],
    });

    this.filteredTestDescriptions = [];
    this.dropdownOpen = [];
    this.addTest('material');
    this.addTest('field');
    this.GetMaterialFun();
    this.GetFieldsFun();
    this.GetCustomersFun();
    this.onCustomerTypeChange();
    this.GetUpdateTestbyid();
  }
  atLeastOneTestValidator() {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const materialTests = formGroup.get('materialTests') as FormArray;
      const fieldTests = formGroup.get('fieldTests') as FormArray;

      const hasValidMaterialTest = materialTests.controls.some(
        (control) =>
          control.get('material')?.valid &&
          control.get('test_description')?.valid &&
          control.get('sample_id')?.valid
      );

      const hasValidFieldTest = fieldTests.controls.some(
        (control) =>
          control.get('test_description')?.valid &&
          control.get('sample_id')?.valid
      );

      return hasValidMaterialTest || hasValidFieldTest
        ? null
        : { noValidTests: true };
    };
  }
  get materialTests(): FormArray {
    return this.step1Form.get('materialTests') as FormArray;
  }

  get fieldTests(): FormArray {
    return this.step1Form.get('fieldTests') as FormArray;
  }

  addTest(type: 'material' | 'field'): void {
    const testGroup = this.formBuilder.group({
      material: [
        type === 'material' ? '' : null,
        type === 'material' ? Validators.required : [],
      ],
      test_description: [[]],
      sample_id: [''],
      remark: [''],
    });

    if (type === 'material') {
      this.materialTests.push(testGroup);
      this.filteredTestDescriptions.push([]);
      this.dropdownOpen.push(false);
      this.onTestMaterialChange(this.materialTests.length - 1);
    } else {
      this.fieldTests.push(testGroup);
      this.filteredTestDescriptions.push(
        this.testDescriptions.filter((desc) => desc.material === null)
      );
      this.dropdownOpen.push(false);
    }
    this.checkForDuplicateMaterials();
  }

  removeTest(index: number, type: 'material' | 'field'): void {
    const formArray =
      type === 'material' ? this.materialTests : this.fieldTests;
    if (formArray.length > 1) {
      formArray.removeAt(index);
      this.filteredTestDescriptions.splice(index, 1);
      this.dropdownOpen.splice(index, 1);
    }
    this.checkForDuplicateMaterials();
  }

  onTestMaterialChange(index: number): void {
    const selectedMaterial =
      this.materialTests.controls[index].get('material')?.value;
    this.materialTests.controls[index].get('test_description')?.setValue([]); // Reset test descriptions
    this.dropdownOpen[index] = false;

    if (selectedMaterial) {
      console.log('Selected Material ID:', selectedMaterial);
      this.getMaterialDescription(index, selectedMaterial); // Call API with index and material ID
    } else {
      this.filteredTestDescriptions[index] = []; // Clear filtered test descriptions if no material is selected
    }
    this.checkForDuplicateMaterials();
  }

  getMaterialDescription(index: number, selectedMaterial: any): void {
    this.employeeService.GetTestDescription(selectedMaterial).subscribe({
      next: (response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.filteredTestDescriptions[index] = response.data.map(
            (item: any) => ({
              value: item.id,
              test_name: item.test_name,
            })
          );
          this.materialTests.controls[index]
            .get('test_description')
            ?.setValue([]);
          this.materialTests.controls[index]
            .get('test_description')
            ?.markAsUntouched();
        } else {
          this.filteredTestDescriptions[index] = [];
          console.error('Failed to fetch test descriptions:', response);
        }
      },
      error: (error: any) => {
        this.filteredTestDescriptions[index] = [];
        console.error('Error fetching test descriptions:', error);
      },
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-multiselect')) {
      this.dropdownOpen = this.dropdownOpen.map(() => false);
    }
  }

  toggleDropdown(index: number): void {
    this.dropdownOpen = this.dropdownOpen.map((_, i) =>
      i === index ? !this.dropdownOpen[i] : false
    );
  }

  isTestSelected(index: number, testValue: string): boolean {
    const formArray =
      index < this.materialTests.length ? this.materialTests : this.fieldTests;
    const formGroupIndex =
      index < this.materialTests.length
        ? index
        : index - this.materialTests.length;
    const selectedTests =
      formArray.controls[formGroupIndex].get('test_description')?.value || [];
    return selectedTests.includes(testValue);
  }

  toggleTestSelection(index: number, testValue: string): void {
    const formArray =
      index < this.materialTests.length ? this.materialTests : this.fieldTests;
    const formGroupIndex =
      index < this.materialTests.length
        ? index
        : index - this.materialTests.length;
    const testDescriptionControl =
      formArray.controls[formGroupIndex].get('test_description');
    let selectedTests = testDescriptionControl?.value || [];

    if (selectedTests.includes(testValue)) {
      selectedTests = selectedTests.filter(
        (value: string) => value !== testValue
      );
    } else {
      selectedTests.push(testValue);
    }

    testDescriptionControl?.setValue(selectedTests);
    testDescriptionControl?.markAsTouched();
    testDescriptionControl?.markAsDirty();
  }

  getSelectedTestsLabel(index: number): string {
    const formArray =
      index < this.materialTests.length ? this.materialTests : this.fieldTests;
    const formGroupIndex =
      index < this.materialTests.length
        ? index
        : index - this.materialTests.length;
    const selectedTests =
      formArray.controls[formGroupIndex].get('test_description')?.value || [];
    return selectedTests
      .map(
        (value: string) =>
          this.filteredTestDescriptions[index].find(
            (desc: any) => desc.value === value
          )?.test_name
      )
      .filter((test_name: string | undefined) => test_name)
      .join(', ');
  }

  onSampleConditionChange(): void {
    const sampleCondition = this.step2Form.get('sample_condition')?.value;
    if (sampleCondition === 'Not Acceptable') {
      this.step2Form
        .get('sample_condition_reason')
        ?.setValidators([Validators.required]);
    } else {
      this.step2Form.get('sample_condition_reason')?.clearValidators();
    }
    this.step2Form.get('sample_condition_reason')?.updateValueAndValidity();
  }

  onCustomerTypeChange(): void {
    const customerType = this.step1Form.get('customer_type')?.value;
    const nameOfCustomerControl = this.step1Form.get('name_of_customer');
    const mobileNoControl = this.step1Form.get('mobile_no');
    const emailControl = this.step1Form.get('email');
    const addressControl = this.step1Form.get('address');
    const existingCustomerControl = this.step1Form.get(
      'name_of_existing_customer'
    );

    if (customerType === 'existing') {
      existingCustomerControl?.setValidators([Validators.required]);
      nameOfCustomerControl?.clearValidators();
      mobileNoControl?.clearValidators();
      emailControl?.clearValidators();
      addressControl?.clearValidators();
    } else if (customerType === 'new') {
      existingCustomerControl?.clearValidators();
      nameOfCustomerControl?.setValidators([Validators.required]);
      mobileNoControl?.setValidators([
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]);
      emailControl?.setValidators([Validators.required, Validators.email]);
      addressControl?.setValidators([Validators.required]);
    }

    existingCustomerControl?.updateValueAndValidity();
    nameOfCustomerControl?.updateValueAndValidity();
    mobileNoControl?.updateValueAndValidity();
    emailControl?.updateValueAndValidity();
    addressControl?.updateValueAndValidity();
  }

  checkForDuplicateMaterials(): void {
    const materials = this.materialTests.controls
      .map((control) => control.get('material')?.value)
      .filter((value) => value);

    const uniqueMaterials = new Set(materials);
    this.hasDuplicateMaterials = materials.length !== uniqueMaterials.size;
    if (this.hasDuplicateMaterials) {
      this.materialTests.setErrors({ duplicateMaterials: true });
    } else {
      this.materialTests.setErrors(null);
    }
  }

  duplicateMaterialValidator() {
    return (formArray: AbstractControl): ValidationErrors | null => {
      const materials = (formArray as FormArray).controls
        .map((control) => control.get('material')?.value)
        .filter((value) => value);
      const uniqueMaterials = new Set(materials);
      return materials.length !== uniqueMaterials.size
        ? { duplicateMaterials: true }
        : null;
    };
  }

  submitted: boolean = false;
  test_request_id: any;
  saveStep1(): void {
    this.checkForDuplicateMaterials();
    this.step1Form.markAllAsTouched();
    if (this.step1Form.valid && !this.hasDuplicateMaterials) {
      const formValue = this.step1Form.value;
      const formData: FormData = new FormData();

      // Append customer-related fields
      // const customerType = formValue.customer_type;

      formData.append('customer_id', formValue.name_of_existing_customer || '');

      formData.append('work_name', formValue.name_of_work_project || '');
      formData.append('_method', 'put');
      formData.append(
        'expected_delivery_date',
        formValue.expected_date_of_delivery || ''
      );

      // Process materialTests
      formValue.materialTests.forEach((materialTest: any, index: number) => {
        if (
          materialTest.material &&
          materialTest.test_description.length &&
          materialTest.sample_id
        ) {
          formData.append(
            `materials[${index}][material_id]`,
            materialTest.material || ''
          );
          materialTest.test_description.forEach((testId: any, i: number) => {
            formData.append(
              `materials[${index}][test_configuration_ids][${i}]`,
              testId
            );
          });
          formData.append(
            `materials[${index}][sample_id]`,
            materialTest.sample_id || ''
          );
          formData.append(
            `materials[${index}][remark]`,
            materialTest.remark || ''
          );
        }
      });

      // Process fieldTests
      formValue.fieldTests.forEach((fieldTest: any, index: number) => {
        if (fieldTest.test_description.length && fieldTest.sample_id) {
          formData.append(
            `fields[${index}][test_configuration_id]`,
            fieldTest.test_description || ''
          );
          formData.append(
            `fields[${index}][sample_id]`,
            fieldTest.sample_id || ''
          );
          formData.append(`fields[${index}][remark]`, fieldTest.remark || '');
        }
      });

      this.employeeService.updateTestRequest(formData, this.test_id).subscribe(
        (response: any) => {
          if (response.status === 200 || response.status === 201) {
            this.successMessage = 'Test Created Successfully';
            this.notificationService.show(response.message, 'success', 3000);
            this.test_request_id = response.test_request_id;
            this.currentStep = 2;
          } else {
            this.submitted = false;
            this.errorMessage =
              response.errors || response.message || 'Failed to create test';
            alert(this.errorMessage);
          }
        },
        (error: any) => {
          this.submitted = false;
          this.errorMessage =
            error.message || 'An error occurred while creating the test';
          alert(this.errorMessage);
        }
      );
    } else {
      this.step1Form.markAllAsTouched();
      this.errorMessage = this.hasDuplicateMaterials
        ? 'Duplicate materials detected. Please ensure each material is unique.'
        : this.step1Form.hasError('noValidTests')
        ? 'At least one valid test (Material or Field) is required.'
        : 'Please fill all required fields in Step 1';
      alert(this.errorMessage);
    }
  }

  previousStep(): void {
    this.currentStep = 1;
  }

  submitTest(): void {
    if (this.step2Form.valid) {
      const formValue = this.step2Form.value;
      const formData: FormData = new FormData();

      // Append all Step 2 form fields to FormData
      formData.append('label_present', formValue.sample_proper_label || '');
      formData.append(
        'has_quantity',
        formValue.sample_appropriate_quantity || ''
      );
      formData.append(
        'is_sealed',
        formValue.sample_packed_sealed_properly || ''
      );
      formData.append('condition', formValue.sample_condition || '');
      // formData.append(
      //   'sample_condition_reason',
      //   formValue.sample_condition_reason || ''
      // );
      formData.append(
        'requirements_defined',
        formValue.requirements_defined_documented || ''
      );
      formData.append('mcs_can_meet', formValue.requirements_adequate || '');
      formData.append(
        'method_appropriate',
        formValue.test_method_capability || ''
      );
      formData.append('under_nabl_scope', formValue.tests_per_nabl_scope || '');
      formData.append(
        'customer_witnessed',
        formValue.tests_witnessed_by_customer || ''
      );
      formData.append(
        'decision_rule_required',
        formValue.decision_rule_required || ''
      );
      formData.append('test_request_id', this.test_id || '');

      this.employeeService.createTestRequestStep2(formData).subscribe(
        (response: any) => {
          if (response.status === 200 || response.status === 201) {
            this.successMessage = 'Test Created Successfully';
            this.router.navigate(['/admin/test-management']);
            setTimeout(() => {
              this.notificationService.show(response.message, 'success', 3000);
            }, 1000);
          } else {
            this.submitted = false;
            this.errorMessage =
              response.errors || response.message || 'Failed to submit test';
            alert(this.errorMessage);
          }
        },
        (error: any) => {
          this.submitted = false;
          this.errorMessage =
            error.message || 'An error occurred while submitting the test';
          alert(this.errorMessage);
        }
      );
    } else {
      this.step2Form.markAllAsTouched();
      this.errorMessage = 'Please fill all required fields in Step 2';
      alert(this.errorMessage);
    }
  }

  cancel(): void {
    this.currentStep = 1;
    this.step1Form.reset();
    this.step2Form.reset();
    this.materialTests.clear();
    this.fieldTests.clear();
    this.filteredTestDescriptions = [];
    this.dropdownOpen = [];
    this.addTest('material');
    this.addTest('field');
    this.testId = null;
    this.hasDuplicateMaterials = false;
    this.router.navigate(['/admin/test-management']);
  }

  minDateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate < today ? { minDate: true } : null;
    };
  }

  materialTestsList: any;
  GetMaterialFun() {
    this.employeeService.GetMaterialList().subscribe((response: any) => {
      if (response.status === 200 || response.status === 201) {
        this.materialTestsList = response.data.records;
      } else {
        this.materialTestsList = [];
      }
    });
  }

  GetFieldsFun() {
    this.employeeService.GetFieldsList().subscribe((response: any) => {
      if (response.status === 200 || response.status === 201) {
        this.fieldTest = response.data;
      } else {
        this.fieldTest = [];
      }
    });
  }
  GetCustomersFun() {
    this.employeeService.GetCustomersList().subscribe((response: any) => {
      if (response.status === 200 || response.status === 201) {
        this.existingCustomers = response.data;
      } else {
        this.existingCustomers = [];
      }
    });
  }
  testDetails: any;
  GetUpdateTestbyid() {
    this.employeeService.getUpdateTestByID(this.test_id).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.testDetails = response.data;

          // Step 1: Set customer type and related fields
          const customerType = this.testDetails.customer_id
            ? 'existing'
            : 'new';
          this.step1Form.patchValue({
            test_request_no: this.testDetails.test_number || '',
            customer_type: customerType,
            name_of_existing_customer: this.testDetails.customer_id || '',
            name_of_customer: this.testDetails.customer?.name || '',
            address: this.testDetails.customer?.address || '',
            email: this.testDetails.customer?.email || '',
            mobile_no: this.testDetails.customer?.mobile || '',
            name_of_work_project: this.testDetails.work_name || '',
            expected_date_of_delivery:
              this.testDetails.expected_delivery_date || '',
          });

          // Step 2: Clear existing material and field tests
          this.materialTests.clear();
          this.fieldTests.clear();
          this.filteredTestDescriptions = [];
          this.dropdownOpen = [];

          // Step 3: Populate materialTests FormArray
          this.testDetails.materials.forEach((material: any, index: number) => {
            const testGroup = this.formBuilder.group({
              material: [material.material_id || '', Validators.required],
              test_description: [
                material.tests.map((test: any) =>
                  test.test_configuration_id.toString()
                ) || [],
                Validators.required,
              ],
              sample_id: [material.sample_id || ''],
              remark: [material.remark || ''],
            });
            this.materialTests.push(testGroup);
            this.filteredTestDescriptions.push([]);
            this.dropdownOpen.push(false);
            this.getMaterialDescription(index, material.material_id); // Fetch test descriptions for this material
          });

          // Step 4: Populate fieldTests FormArray
          this.testDetails.fields.forEach((field: any) => {
            const testGroup = this.formBuilder.group({
              test_description: [
                field.test_configuration_id.toString() || '',
                Validators.required,
              ],
              sample_id: [field.sample_id || ''],
              remark: [field.remark || ''],
            });
            this.fieldTests.push(testGroup);
            this.filteredTestDescriptions.push(
              this.testDescriptions.filter((desc) => desc.material === null)
            );
            this.dropdownOpen.push(false);
          });

          // Step 5: Populate step2Form (Checklist)
          this.step2Form.patchValue({
            sample_proper_label:
              this.testDetails.checklist?.label_present ||
              this.testDetails.checklist?.label_present?.toString() ||
              '',
            sample_appropriate_quantity:
              this.testDetails.checklist?.has_quantity ||
              this.testDetails.checklist?.has_quantity?.toString() ||
              '',
            sample_packed_sealed_properly:
              this.testDetails.checklist?.is_sealed ||
              this.testDetails.checklist?.is_sealed?.toString() ||
              '',
            sample_condition: this.testDetails.checklist?.condition || '',
            sample_condition_reason:
              this.testDetails.checklist?.sample_condition_reason || '',
            requirements_defined_documented:
              this.testDetails.checklist?.requirements_defined ||
              this.testDetails.checklist?.requirements_defined?.toString() ||
              '',
            requirements_adequate:
              this.testDetails.checklist?.mcs_can_meet ||
              this.testDetails.checklist?.mcs_can_meet?.toString() ||
              '',
            test_method_capability:
              this.testDetails.checklist?.method_appropriate ||
              this.testDetails.checklist?.method_appropriate?.toString() ||
              '',
            tests_per_nabl_scope:
              this.testDetails.checklist?.under_nabl_scope ||
              this.testDetails.checklist?.under_nabl_scope?.toString() ||
              '',
            tests_witnessed_by_customer:
              this.testDetails.checklist?.customer_witnessed ||
              this.testDetails.checklist?.customer_witnessed?.toString() ||
              '',
            decision_rule_required:
              this.testDetails.checklist?.decision_rule_required ||
              this.testDetails.checklist?.decision_rule_required?.toString() ||
              '',
          });

          // Step 6: Trigger customer type change to update validators
          this.onCustomerTypeChange();

          // Step 7: Check for duplicate materials
          this.checkForDuplicateMaterials();
        } else {
          this.notificationService.show(
            'Failed to fetch test details',
            'error',
            3000
          );
        }
      },
      (error: any) => {
        this.notificationService.show(
          'Error fetching test details',
          'error',
          3000
        );
      }
    );
  }
}
