import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-test-master',
  templateUrl: './test-master.component.html',
  styleUrls: ['./test-master.component.scss'],
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
export class TestMasterComponent implements OnInit {
  showreset: boolean = false;
  searchText: string | undefined;
  tableSize: any = 10;
  tableSizes: any = [10, 20, 50, 100, 'all'];
  totalRecords: any;
  page: number = 1;
  searchbarform!: FormGroup;
  testCreateForm!: FormGroup;
  testUpdateForm!: FormGroup;
  testViewForm!: FormGroup;
  testCreateOpen: boolean = false;
  testViewOpen: boolean = false;
  testUpdateOpen: boolean = false;
  successMessage: string = '';
  openSuccessMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private jwtService: JwtService
  ) {}

  testList = [
    {
      testName: 'Test 1',
      testMaterial: 'Iron',
      testType: 'Material Based Test',
      testMethod: 'IS:561-P1-2021',
      inputFields: ['Field1 (kg)', 'Field2 (N)'],
    },
    {
      testName: 'Test 2',
      testMaterial: 'Cement',
      testType: 'Material Based Test',
      testMethod: 'IS:4031(P-4)1988',
      inputFields: ['Field3 (MPa)'],
    },
    {
      testName: 'Test 3',
      testMaterial: 'Soil',
      testType: 'Field Based Test',
      testMethod: 'IS 2131',
      inputFields: ['Field4 (mm)', 'Field5 (kg)'],
    },
  ];

  user_id: any;

  ngOnInit(): void {
    this.user_id = this.jwtService.getpanelUserId();
    this.searchbarform = this.formBuilder.group({
      searchbar: ['', [Validators.required]],
    });
    this.testCreateForm = this.formBuilder.group({
      test_name: ['', [Validators.required]],
      test_type: ['Material Based Test', [Validators.required]],
      material_type: ['CC Cubes', [Validators.required]],
      test_method: ['', [Validators.required]],
      input_fields: this.formBuilder.array([
        this.formBuilder.group({
          input_field: ['', [Validators.required]],
          unit: ['UOM', [Validators.required]],
        }),
      ]),
    });
    this.testUpdateForm = this.formBuilder.group({
      test_name: ['', [Validators.required]],
      test_type: ['Material Based Test', [Validators.required]],
      material_type: ['Iron', [Validators.required]],
      test_method: ['', [Validators.required]],
      input_fields: this.formBuilder.array([]),
    });
    this.testViewForm = this.formBuilder.group({
      test_name: [''],
      test_type: ['Material Based Test'],
      material_type: ['Iron'],
      test_method: [''],
      input_fields: this.formBuilder.array([]),
    });

    this.getTests();
    // Subscribe to test_type changes for Create form
    this.testCreateForm.get('test_type')?.valueChanges.subscribe((value) => {
      const materialTypeControl = this.testCreateForm.get('material_type');
      if (value === 'Material Based Test') {
        materialTypeControl?.setValidators([Validators.required]);
        materialTypeControl?.updateValueAndValidity();
      } else {
        materialTypeControl?.clearValidators();
        materialTypeControl?.updateValueAndValidity();
        materialTypeControl?.setValue('');
      }
    });
    // Subscribe to test_type changes for Update form
    this.testUpdateForm.get('test_type')?.valueChanges.subscribe((value) => {
      const materialTypeControl = this.testUpdateForm.get('material_type');
      if (value === 'Material Based Test') {
        materialTypeControl?.setValidators([Validators.required]);
        materialTypeControl?.updateValueAndValidity();
      } else {
        materialTypeControl?.clearValidators();
        materialTypeControl?.updateValueAndValidity();
        materialTypeControl?.setValue('');
      }
    });
  }

  get inputFields() {
    return this.testCreateForm.get('input_fields') as FormArray;
  }

  get updateInputFields() {
    return this.testUpdateForm.get('input_fields') as FormArray;
  }

  get viewInputFields() {
    return this.testViewForm.get('input_fields') as FormArray;
  }

  addInputField() {
    this.inputFields.push(
      this.formBuilder.group({
        input_field: ['', [Validators.required]],
        unit: ['UOM', [Validators.required]],
      })
    );
  }

  removeInputField(index: number) {
    this.inputFields.removeAt(index);
  }

  addUpdateInputField() {
    this.updateInputFields.push(
      this.formBuilder.group({
        input_field: ['', [Validators.required]],
        unit: ['kg', [Validators.required]],
      })
    );
  }

  removeUpdateInputField(index: number) {
    this.updateInputFields.removeAt(index);
  }

  testTable: any[] = [];
  getTests() {
    this.testTable = this.testList;
    this.totalRecords = this.testList.length;
  }

  table_heading = [
    {
      heading0: 'Sr No',
      heading1: 'Test Name',
      heading2: 'Test Type',
      heading22: 'Material',
      heading3: 'Test Method Name',
      heading6: 'Action',
    },
  ];

  searchfun() {
    if (this.searchbarform.valid) {
      this.showreset = true;
      this.searchText = this.searchbarform.get('searchbar')?.value;
      this.getTests();
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
    this.getTests();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getTests();
  }

  errorMessage: string | undefined;
  submitted: boolean = false;

  createTest() {
    if (this.testCreateForm.valid) {
      const formValue = this.testCreateForm.value;
      this.testList.push({
        testName: formValue.test_name,
        testType: formValue.test_type,
        testMaterial: formValue.testMaterial,
        testMethod: formValue.test_method,
        inputFields: formValue.input_fields.map(
          (field: any) => `${field.input_field} (${field.unit})`
        ),
      });
      this.closeModal();
      this.successMessage = 'Test Created';
      this.getTests();
      setTimeout(() => {
        this.openSuccessMessage = true;
        setTimeout(() => {
          this.openSuccessMessage = false;
        }, 1800);
      }, 200);
    } else {
      this.submitted = false;
      this.errorMessage = 'Please enter all the details';
      this.testCreateForm.markAllAsTouched();
      console.log(this.findInvalidControls(this.testCreateForm));
    }
  }

  testId: any;
  openEditModal(test: any) {
    this.testUpdateOpen = true;
    this.testId = this.testList.indexOf(test);
    this.fillUpdateForm(test);
  }

  fillUpdateForm(data: any) {
    this.testUpdateForm.patchValue({
      test_name: data.testName,
      test_type: data.testType,
      test_method: data.testMethod,
    });
    this.updateInputFields.clear();
    data.inputFields.forEach((field: string) => {
      const [inputField, unit] = field.split(' (');
      const cleanedUnit = unit ? unit.replace(')', '') : 'kg';
      this.updateInputFields.push(
        this.formBuilder.group({
          input_field: [inputField || '', [Validators.required]],
          unit: [cleanedUnit || 'kg', [Validators.required]],
        })
      );
    });
  }

  updateTest() {
    if (this.testUpdateForm.valid) {
      const formValue = this.testUpdateForm.value;
      this.testList[this.testId] = {
        testName: formValue.test_name,
        testType: formValue.test_type,
        testMaterial: formValue.testMaterial,
        testMethod: formValue.test_method,
        inputFields: formValue.input_fields.map(
          (field: any) => `${field.input_field} (${field.unit})`
        ),
      };
      this.closeModal();
      this.successMessage = 'Test Updated';
      this.getTests();
      setTimeout(() => {
        this.openSuccessMessage = true;
        setTimeout(() => {
          this.openSuccessMessage = false;
        }, 1800);
      }, 200);
    } else {
      this.submitted = false;
      this.errorMessage = 'Please enter all the details';
      this.testUpdateForm.markAllAsTouched();
      console.log(this.findInvalidControls(this.testUpdateForm));
    }
  }

  openViewModal(test: any) {
    this.testViewOpen = true;
    this.fillViewForm(test);
  }

  fillViewForm(data: any) {
    this.testViewForm.patchValue({
      test_name: data.testName,
      test_type: data.testType,
      test_method: data.testMethod,
    });
    this.viewInputFields.clear();
    data.inputFields.forEach((field: string) => {
      const [inputField, unit] = field.split(' (');
      const cleanedUnit = unit ? unit.replace(')', '') : '';
      this.viewInputFields.push(
        this.formBuilder.group({
          input_field: [inputField || ''],
          unit: [cleanedUnit || ''],
        })
      );
    });
  }

  findInvalidControls(form: FormGroup) {
    const invalid = [];
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  openCreateModal() {
    this.testCreateOpen = true;
    this.testCreateForm.reset();

    this.inputFields.clear();
    this.addInputField();
    this.testCreateForm.patchValue({
      test_type: 'Material Based Test',
    });
  }

  closeModal() {
    this.testCreateOpen = false;
    this.testUpdateOpen = false;
    this.testViewOpen = false;
  }

  clickModalContent(event: Event): void {
    event.stopPropagation();
  }
}
