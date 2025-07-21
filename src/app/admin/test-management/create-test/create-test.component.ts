import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss'],
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
export class CreateTestComponent implements OnInit {
  currentStep: number = 1;
  step1Form!: FormGroup;
  step2Form!: FormGroup;
  successMessage: string = '';
  openSuccessMessage: boolean = false;
  errorMessage?: string;
  testId: any = null;
  today: any;

  materials = [
    { value: 'Mild Steel', label: 'Mild Steel' },
    { value: 'Stainless Steel', label: 'Stainless Steel' },
    { value: 'Aluminum', label: 'Aluminum' },
  ];

  testDescriptions = [
    { material: 'Mild Steel', value: 'Tensile Test', label: 'Tensile Test' },
    { material: 'Mild Steel', value: 'Hardness Test', label: 'Hardness Test' },
    {
      material: 'Stainless Steel',
      value: 'Corrosion Test',
      label: 'Corrosion Test',
    },
    { material: 'Stainless Steel', value: 'Impact Test', label: 'Impact Test' },
    { material: 'Aluminum', value: 'Fatigue Test', label: 'Fatigue Test' },
    { material: 'Aluminum', value: 'Bend Test', label: 'Bend Test' },
    {
      material: null,
      value: 'Soil Compaction Test',
      label: 'Soil Compaction Test',
    },
    {
      material: null,
      value: 'Field Density Test',
      label: 'Field Density Test',
    },
  ];

  filteredTestDescriptions: any[][] = [];

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.today = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {
    const defaultDate = '2025-05-30';

    this.step1Form = this.formBuilder.group({
      test_request_no: [{ value: '', disabled: true }],
      name_of_customer: ['', Validators.required],
      address: ['', Validators.required],
      date: [defaultDate, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile_no: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      name_of_work_project: ['', Validators.required],
      expected_date_of_delivery: [
        '',
        [Validators.required, this.minDateValidator()],
      ],
      materialTests: this.formBuilder.array([]),
      fieldTests: this.formBuilder.array([]),
    });

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
    this.addTest('material');
    this.addTest('field');
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
      test_description: [[], Validators.required],
      sample_id: ['', Validators.required],
      remark: [''],
    });

    if (type === 'material') {
      this.materialTests.push(testGroup);
      this.filteredTestDescriptions.push([]);
      this.onTestMaterialChange(this.materialTests.length - 1);
    } else {
      this.fieldTests.push(testGroup);
      this.filteredTestDescriptions.push(
        this.testDescriptions.filter((desc) => desc.material === null)
      );
    }
  }

  removeTest(index: number, type: 'material' | 'field'): void {
    const formArray =
      type === 'material' ? this.materialTests : this.fieldTests;
    if (formArray.length > 1) {
      formArray.removeAt(index);
      this.filteredTestDescriptions.splice(index, 1);
    }
  }

  onTestMaterialChange(index: number): void {
    const selectedMaterial =
      this.materialTests.controls[index].get('material')?.value;
    this.filteredTestDescriptions[index] = this.testDescriptions.filter(
      (desc) => desc.material === selectedMaterial
    );
    this.materialTests.controls[index].get('test_description')?.setValue([]);
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

  saveStep1(): void {
    this.currentStep = 2;
  }

  previousStep(): void {
    this.currentStep = 1;
  }

  submitTest(): void {
    if (this.step2Form.valid) {
      this.successMessage = 'Test Created';
      setTimeout(() => {
        this.openSuccessMessage = true;
        setTimeout(() => {
          this.openSuccessMessage = false;
          this.cancel();
        }, 1000);
      }, 200);
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
    this.addTest('material');
    this.addTest('field');
    this.testId = null;
    this.router.navigate(['/admin/test-management']);
  }
  minDateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null; // Skip if no value (required validator will handle this)
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
      return selectedDate < today ? { minDate: true } : null;
    };
  }
}
