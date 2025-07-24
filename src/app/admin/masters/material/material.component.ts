import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { LoginService } from 'src/app/core/services/login.service';
import { NotificationService } from 'src/app/core/services/notificationnew.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss',
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
            transform: 'translateX(0)', // Final position for slide-in effect
            opacity: 1, // Final opacity
          })
        ),
      ]),
    ]),

    trigger('fadeIn', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'scale(0.5)', // Start with smaller size
        })
      ),
      transition(':enter', [
        animate(
          '0.5s ease-out',
          style({
            opacity: 1,
            transform: 'scale(1)', // Final size
          })
        ),
      ]),
    ]),
  ],
})
export class MaterialComponent {
  showreset: boolean = false; // Reintroduced for reset button visibility
  searchbarform!: FormGroup;
  creatclubform!: FormGroup;
  updateclubform!: FormGroup;
  Viewclubform!: FormGroup;
  tableSize: any = 10;
  tableSizes: any = [10, 20, 50, 100, 'all'];
  totalRecords: any;
  page: number = 1;
  creatclubopen: boolean = false;
  updateclubopen: boolean = false;
  viewclubopen: boolean = false;

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.GetMaterialFun();
  }

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private jwtService: JwtService,
    private notificationService: NotificationService,
    private loginService: LoginService
  ) {}

  searchfun() {
    if (this.searchbarform.valid) {
      this.showreset = true; // Show reset button when search is performed
      this.GetMaterialFun();
    } else {
      this.searchbarform.markAllAsTouched();
    }
  }

  resetsearchbar() {
    this.searchbarform.get('searchbar')?.reset(); // Clear the search input
    this.showreset = false; // Hide reset button
    this.page = 1; // Reset to first page
    this.GetMaterialFun(); // Reload data without search
  }
  uuserId: any;
  ngOnInit(): void {
    this.uuserId = this.jwtService.getpanelUserId();
    this.searchbarform = this.formBuilder.group({
      searchbar: ['', [Validators.required]],
    });

    this.creatclubform = this.formBuilder.group({
      Name: ['', [Validators.required]],
    });

    this.updateclubform = this.formBuilder.group({
      Name: ['', [Validators.required]],
    });

    this.Viewclubform = this.formBuilder.group({
      Name: [''],
    });
    this.GetMaterialFun();
  }

  examCategory: any;
  table_heading = [
    {
      heading0: 'Serial No.',
      heading1: 'Name',
      heading2: 'Status',
      heading3: 'Action',
    },
  ];

  OpenEditModal(user: any): void {
    this.currrentClubId = user.id;
    this.updateclubopen = true;
    this.GetupdateMaterialbyid();
  }

  currrentClubId: any;
  openviewModal(user: any): void {
    this.viewclubopen = true;
    this.currrentClubId = user.id;
    this.Viewclubform.patchValue({ Name: user.name });
  }

  GetupdateMaterialbyid() {
    // this.uuserId = Student.id;
    // this.employeeService
    //   .getMaterialbyID(this.currrentClubId)
    //   .subscribe((response: any) => {
    //     if (response.status === 200) {
    //       this.fillformdate(response.data);
    //     }
    //   });
  }

  async fillformdate(response: any) {
    this.updateclubform = this.formBuilder.group({
      Name: [response.name, [Validators.required, Validators.minLength(2)]],
    });
  }
  updateUser() {
    if (this.updateclubform.valid) {
      const formData = new FormData();

      formData.append('name', this.updateclubform.get('Name')?.value);
      formData.append('_method', 'put');
      formData.append('user_id', this.uuserId);

      // this.employeeService
      //   .updateMaterial(formData, this.currrentClubId)
      //   .subscribe({
      //     next: (response: any) => {
      //       if (response.status === 200 || response.status === 201) {
      //         this.closeModal();
      //         this.notificationService.show(response.message, 'success', 3000);
      //         this.ngOnInit();
      //       } else {
      //         this.notificationService.show(response.error, 'error', 3000);
      //       }
      //     },
      //     error: (error:any) => {
      //       console.error('Update failed', error);
      //     },
      //   });
    } else {
      this.updateclubform.markAllAsTouched();
    }
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.GetMaterialFun();
  }

  closeModal() {
    this.updateclubopen = false;
    this.creatclubopen = false;
    this.viewclubopen = false;
  }

  clubmodal() {
    this.creatclubopen = true;
  }

  creatclub() {
    if (this.creatclubform.valid) {
      const formData = new FormData();
      formData.append('name', this.creatclubform.get('Name')?.value);
      formData.append('user_id', '1');

      // this.employeeService
      //   .createMaterial(formData)
      //   .subscribe((response: any) => {
      //     if (response.status === 200 || response.status === 201) {
      //       this.closeModal();
      //       this.notificationService.show(response.message, 'success', 3000);
      //       this.ngOnInit();
      //       this.GetCategoryFun();
      //     } else {
      //       this.notificationService.show(response.error, 'error', 3000);
      //     }
      //   });
    } else {
      this.creatclubform.markAllAsTouched();
    }
  }

  GetMaterialFun() {
    // this.employeeService
    //   .GetMaterialAPi(
    //     this.tableSize,
    //     this.page,
    //     this.searchbarform.get('searchbar')?.value
    //   )
    //   .subscribe((response: any) => {
    //     if (response.status === 200) {
    //       this.examCategory = response.data.records;
    //       this.totalRecords = response.data.total;
    //     }
    //   });
  }

  async Status(id: string, status: any) {
    const actionMessage = status ? 'activated' : 'deactivated';
    // this.employeeService
    //   .changeMaterialstatus(id, status)
    //   .subscribe((response: any) => {
    //     if (response.status === 200) {
    //       this.GetCategoryFun();
    //     }
    //   });
  }
}
