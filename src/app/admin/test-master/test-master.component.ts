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
import { EmployeeService } from 'src/app/core/services/Employee.service';
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
    private jwtService: JwtService,
    private employeeService: EmployeeService
  ) {}

  user_id: any;

  ngOnInit(): void {
    this.user_id = this.jwtService.getpanelUserId();
    this.searchbarform = this.formBuilder.group({
      searchbar: ['', [Validators.required]],
    });
    this.testCreateForm = this.formBuilder.group({
      test_name: ['', [Validators.required]],
      test_type: ['', [Validators.required]],
      material_type: ['', [Validators.required]],
      test_method: ['', [Validators.required]],
      input_fields: this.formBuilder.array([
        this.formBuilder.group({
          input_field: ['', [Validators.required]],
          unit: ['', [Validators.required]],
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
    this.GetConfigureMaterialFun();
    this.GetTestTypeFun();
    this.GetUOMListFun();
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
  materialsList: any[] = [];
  GetConfigureMaterialFun() {
    this.employeeService
      .GetConfigureMaterialAPi()
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.materialsList = response.data;
        }
      });
  }
  testTypeList: any[] = [];
  GetTestTypeFun() {
    this.employeeService.GetTestTypeAPi().subscribe((response: any) => {
      if (response.status === 200) {
        this.testTypeList = response.data;
      }
    });
  }
  umoList: any[] = [];
  GetUOMListFun() {
    this.employeeService.GetUOMAPi().subscribe((response: any) => {
      if (response.status === 200) {
        this.umoList = response.data;
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
        unit: ['', [Validators.required]],
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
  staffTable: any;
  getTests() {
    this.employeeService
      .GetConfigureTestAPi(this.tableSize, this.page, this.searchText)
      .subscribe((response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.testTable = response.data.records;
          this.totalRecords = response.data.total;
        }
      });
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
      const formData: FormData = new FormData();
      formData.append('test_name', formValue.test_name);
      formData.append('test_type_id', formValue.test_type);
      if (formValue.test_type == 1) {
        formData.append('material_id', formValue.material_type);
      }
      formData.append('test_method_name', formValue.test_method);
      formValue.input_fields.forEach((field: any, index: number) => {
        formData.append(`input_fields[${index}][name]`, field.input_field);
        formData.append(`input_fields[${index}][uom_id]`, field.unit);
      });

      this.employeeService.createConfigureTest(formData).subscribe(
        (response: any) => {
          if (response.status === 200 || response.status === 201) {
            this.closeModal();
            this.successMessage = 'Test Created Successfully';
            this.ngOnInit();
            setTimeout(() => {
              this.openSuccessMessage = true;
              setTimeout(() => {
                this.openSuccessMessage = false;
              }, 1800);
            }, 200);
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
      this.submitted = false;
      this.errorMessage = 'Please enter all the details';
      alert(this.errorMessage);
      this.testCreateForm.markAllAsTouched();
      console.log(this.findInvalidControls(this.testCreateForm));
    }
  }

  testId: any;
  openEditModal(test: any) {
    this.testUpdateOpen = true;
    this.testId = test.id;
    this.getTestConfigurebyID(this.testId);
  }
  getTestConfigurebyID(configureTestId: any) {
    this.employeeService
      .getTestConfigureByID(configureTestId)
      .subscribe((response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.fillUpdateForm(response.data);
          this.fillViewForm(response.data);
        }
      });
  }

  fillUpdateForm(data: any) {
    this.testUpdateForm.patchValue({
      test_name: data.test_name,
      test_type: data.test_type_id,
      material_type: data.material_id || null,
      test_method: data.test_method_name,
    });
    this.updateInputFields.clear();
    data.input_fields.forEach((field: any) => {
      this.updateInputFields.push(
        this.formBuilder.group({
          input_field: [field.input_field_name || '', [Validators.required]],
          unit: [field.uom_id || null, [Validators.required]],
        })
      );
    });
  }

  updateTest() {
    if (this.testUpdateForm.valid) {
      const formValue = this.testUpdateForm.value;
      const formData: FormData = new FormData();
      formData.append('test_name', formValue.test_name);
      formData.append('test_type_id', formValue.test_type);
      if (formValue.test_type == 1) {
        formData.append('material_id', formValue.material_type);
      }
      formData.append('test_method_name', formValue.test_method);
      formValue.input_fields.forEach((field: any, index: number) => {
        formData.append(`input_fields[${index}][name]`, field.input_field);
        formData.append(`input_fields[${index}][uom_id]`, field.unit);
      });
      formData.append('_method', 'PUT');

      this.employeeService.updateConfigureTest(formData, this.testId).subscribe(
        (response: any) => {
          if (response.status === 200 || response.status === 201) {
            this.closeModal();
            this.successMessage = 'Test Updated Successfully';
            this.getTests();
            setTimeout(() => {
              this.openSuccessMessage = true;
              setTimeout(() => {
                this.openSuccessMessage = false;
              }, 1800);
            }, 200);
          } else {
            this.submitted = false;
            this.errorMessage =
              response.errors || response.message || 'Failed to update test';
            alert(this.errorMessage);
          }
        },
        (error: any) => {
          this.submitted = false;
          this.errorMessage =
            error.message || 'An error occurred while updating the test';
          alert(this.errorMessage);
        }
      );
    } else {
      this.submitted = false;
      this.errorMessage = 'Please enter all the details';
      this.testUpdateForm.markAllAsTouched();
      console.log(this.findInvalidControls(this.testUpdateForm));
    }
  }

  openViewModal(test: any) {
    this.testViewOpen = true;
    this.testId = test.id;
    this.getTestConfigurebyID(this.testId);
  }

  fillViewForm(data: any) {
    const testType =
      this.testTypeList.find((t) => t.id == data.test_type_id)?.name || '';
    const material =
      this.materialsList.find((m) => m.id == data.material_id)?.name || '';
    this.testViewForm.patchValue({
      test_name: data.test_name,
      test_type: testType,
      material_type: material,
      test_method: data.test_method_name,
    });
    this.viewInputFields.clear();
    data.input_fields.forEach((field: any) => {
      const unit = this.umoList.find((u) => u.id == field.uom_id)?.name || '';
      this.viewInputFields.push(
        this.formBuilder.group({
          input_field: [field.input_field_name || ''],
          unit: [unit || ''],
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
      test_type: '',
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
