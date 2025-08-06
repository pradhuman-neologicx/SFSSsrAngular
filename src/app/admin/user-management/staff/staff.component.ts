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
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { NotificationService } from 'src/app/core/services/notificationnew.service';

interface Staff {
  id: number;
  name: string;
  email: string;
  mobile: string;
  department: string;
  role: string;
  is_active: any;
}
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
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
export class StaffComponent implements OnInit {
  showreset: any = false;
  searchText: any;
  tableSize: any = 10;
  tableSizes: any = [10, 20, 50, 100, 'all'];
  totalRecords: any;
  page: number = 1;
  searchbarform!: FormGroup;
  staffcreate!: FormGroup;
  staffupdate!: FormGroup;
  staffview!: FormGroup;
  staffcreateopen: boolean = false;
  staffviewopen: boolean = false;
  staffupdateopen: boolean = false;

  // Upload modal state
  uploadModalOpen: boolean = false;
  uploadForm!: FormGroup;
  selectedUploadFile: File | null = null;
  selectedUploadFileName: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private jwtService: JwtService,
    private notificationService: NotificationService
  ) {}

  user_id: any;
  ngOnInit(): void {
    this.user_id = this.jwtService.getpanelUserId();
    this.searchbarform = this.formBuilder.group({
      searchbar: ['', [Validators.required]],
    });
    this.staffcreate = this.formBuilder.group({
      // image: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      department: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
    this.staffupdate = this.formBuilder.group({
      // image: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      department: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
    this.staffview = this.formBuilder.group({
      // image: [''],
      name: [''],
      email: [''],
      mobile: [''],
      department: [''],
      role: [''],
    });
    this.uploadForm = this.formBuilder.group({
      file: ['', Validators.required],
    });

    this.GetStaff();
    this.GetDepartment();
  }

  staffTable: any;
  GetStaff() {
    this.employeeService
      .GetStaff(this.tableSize, this.page, this.searchText)
      .subscribe((response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.staffTable = response.data.records;
          this.totalRecords = response.data.total;
        }
      });
  }
  departmentTable: any;
  rolesList: any;
  GetDepartment() {
    this.employeeService.GetDepartment().subscribe((response: any) => {
      if (response.status === 200 || response.status === 201) {
        this.departmentTable = response.data;
        // this.totalRecords = response.data.total;
      }
    });
  }
  onDepartmentChange(event: Event) {
    const selectedStateId = (event.target as HTMLSelectElement).value;

    if (selectedStateId) {
      console.log('Selected State ID:', selectedStateId);
      this.getRoles(selectedStateId);
    } else {
      this.rolesList = [];
    }
  }
  getRoles(departmentId: any, selectedRoleId?: any) {
    this.employeeService.GetRoles(departmentId).subscribe((response: any) => {
      if (response.status === 200 || response.status === 201) {
        this.rolesList = response.data;
        // If a role should be prefilled, set it after roles are loaded
        if (selectedRoleId) {
          this.staffupdate.get('role')?.setValue(selectedRoleId);
        } else {
          this.staffupdate.get('role')?.setValue(null);
        }
        this.staffupdate.get('role')?.markAsUntouched();
      }
    });
  }

  table_heading = [
    {
      heading0: 'Sr No',
      heading1: 'Name',
      heading2: 'Email',
      heading3: 'Mobile',
      headin04: 'Department',
      heading4: 'Role',
      heading5: 'Status',
      heading6: 'Action',
    },
  ];

  statusfilter: any;
  onStatusChange(event: any) {
    const status = event.target.value;
    if (status === '') {
      this.statusfilter = undefined;
    } else if (status === '1') {
      this.statusfilter = '1';
    } else if (status === '0') {
      this.statusfilter = '0';
    }
    this.GetStaff();
  }

  searchfun() {
    if (this.searchbarform.valid) {
      this.showreset = true;
      this.searchText = this.searchbarform.get('searchbar')?.value;
      this.GetStaff();
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
    this.GetStaff();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.GetStaff();
  }

  selectedFileNames: string[] = [];
  selectedFiles: any[] = [];
  selectedImages: { imageSrc: string | null; id: number }[] = [];
  fileSizeError: string = '';

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.selectedFileNames.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  generateUniqueId(): number {
    return Math.floor(Math.random() * Date.now());
  }

  onSingleFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSizeBytes = 5000000;
      const maxHeight = 700;

      if (!validImageTypes.includes(fileType)) {
        this.fileSizeError = 'Only PNG, JPEG, and JPG formats are allowed.';
        this.selectedImages = [];
        this.selectedFileNames = [];
        this.selectedFiles = [];
        return;
      }

      if (file.size > maxSizeBytes) {
        this.selectedImages = [];
        this.selectedFileNames = [];
        this.selectedFiles = [];
        this.fileSizeError =
          'The selected file exceeds the maximum allowed size (5MB).';
        return;
      }

      const reader = new FileReader();
      this.selectedFileNames = [file.name];
      this.selectedFiles = [file];

      reader.onload = () => {
        if (typeof reader.result === 'string' || reader.result === null) {
          const id = this.generateUniqueId();
          const imageSrc = reader.result as string;
          const image = new Image();
          image.src = imageSrc;

          image.onload = () => {
            if (image.height > maxHeight) {
              this.selectedImages = [];
              this.selectedFileNames = [];
              this.selectedFiles = [];
              this.fileSizeError =
                'The selected image dimensions exceed the maximum allowed size';
            } else {
              this.selectedImages = [{ imageSrc, id }];
              this.fileSizeError = '';
            }
          };
        }
      };

      reader.readAsDataURL(file);
    }
  }

  successName: any = '';
  openSecondsuccess: boolean = false;
  errorMessage: any;
  submitted!: boolean;

  Createstaff() {
    if (this.staffcreate.valid) {
      const formData: FormData = new FormData();
      formData.append('name', this.staffcreate.get('name')?.value);
      formData.append('email', this.staffcreate.get('email')?.value);
      formData.append('mobile', this.staffcreate.get('mobile')?.value);
      formData.append(
        'department_id',
        this.staffcreate.get('department')?.value
      );
      formData.append('role_id', this.staffcreate.get('role')?.value);
      // if (this.selectedFiles.length > 0) {
      //   const file = this.selectedFiles[0];
      //   formData.append('image', file, file.name);
      // }
      // if (
      //   this.selectedFileNames.toString().includes('jpeg') ||
      //   this.selectedFileNames.toString().includes('jpg') ||
      //   this.selectedFileNames.toString().includes('png')
      // ) {
      this.employeeService.createStaff(formData).subscribe((response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.closeModal();
          this.successName = 'Employee Created';
          // this.ngOnInit();
          this.GetStaff();
          setTimeout(() => {
            this.openSecondsuccess = true;
            setTimeout(() => {
              this.openSecondsuccess = false;
            }, 1800);
          }, 200);
        } else {
          this.submitted = false;
          this.errorMessage = response.errors || response.message;
          alert(this.errorMessage);
        }
      });
    } else {
      this.submitted = false;
      this.errorMessage = 'Please enter all the details';
      this.staffcreate.markAllAsTouched();
      console.log(this.findInvalidControls(this.staffcreate));
    }
  }

  Updatestaff() {
    if (this.staffupdate.valid) {
      const formData: FormData = new FormData();
      formData.append('name', this.staffupdate.get('name')?.value);
      formData.append('email', this.staffupdate.get('email')?.value);
      formData.append('mobile', this.staffupdate.get('mobile')?.value);
      formData.append(
        'department_id',
        this.staffupdate.get('department')?.value
      );
      formData.append('role_id', this.staffupdate.get('role')?.value);
      formData.append('_method', 'put');
      // if (this.selectedFiles.length > 0) {
      //   const file = this.selectedFiles[0];
      //   formData.append('image', file, file.name);
      // } else {
      //   this.submitted = false;
      //   this.errorMessage = 'Please select a file';
      //   return;
      // }
      // if (
      //   this.selectedFileNames.toString().includes('jpeg') ||
      //   this.selectedFileNames.toString().includes('jpg') ||
      //   this.selectedFileNames.toString().includes('png')
      // ) {
      this.employeeService
        .updateStaff(formData, this.staffId)
        .subscribe((response: any) => {
          if (response.status === 200 || response.status === 201) {
            this.closeModal();
            this.successName = 'Staff Updated';
            this.ngOnInit();
            // this.GetStaff();
            setTimeout(() => {
              this.openSecondsuccess = true;
              setTimeout(() => {
                this.openSecondsuccess = false;
              }, 1800);
            }, 200);
          } else {
            this.submitted = false;
            this.errorMessage = response.errors || response.message;
            alert(this.errorMessage);
          }
        });
    } else {
      this.submitted = false;
      this.errorMessage = 'Please enter all the details';
      this.staffupdate.markAllAsTouched();
    }
    // }
    // else {
    //   this.submitted = false;
    //   this.errorMessage = 'Please enter all the details';
    //   this.staffupdate.markAllAsTouched();
    //   console.log(this.findInvalidControls(this.staffupdate));
    // }
  }

  findInvalidControls(formName: any) {
    const invalid = [];
    const controls = formName.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log(invalid);
    return invalid;
  }

  staffId: any;
  async OpenEditModal(staff: any) {
    this.staffupdateopen = true;
    this.staffId = staff.id;
    // Set department and fetch roles for that department
    this.staffupdate.patchValue({
      department: staff.department.id,
    });
    // Fetch roles for the department, then set the role
    this.getRoles(staff.department.id, staff.role.id);
    // Set other fields
    this.staffupdate.patchValue({
      name: staff.name,
      email: staff.email,
      mobile: staff.mobile,
      // department is already set above
      // role will be set after roles are loaded
    });
  }

  async OpenviewModal(staff: any) {
    this.staffviewopen = true;
    this.selectedImages = [];
    this.selectedFileNames = [];
    this.selectedFiles = [];
    this.staffId = staff.id;
    this.employeeService
      .getStaffById(this.staffId)
      .subscribe((response: any) => {
        if (response.status === 200 || response.status === 201) {
          this.fillViewForm(response.data);
        }
      });
  }

  async fillUpdateForm(response: any) {
    this.staffupdate = this.formBuilder.group({
      image: [response.image, [Validators.required]],
      name: [response.name, [Validators.required]],
      email: [response.email, [Validators.required, Validators.email]],
      mobile: [
        response.mobile,
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      department: [response.department.id, [Validators.required]],
      role: [response.role.id, [Validators.required]],
    });

    // const file = await this.createFile(response.image);
    // if (file) {
    //   const maxSizeBytes = 5000000;
    //   const maxHeight = 700;
    //   const fileType = file.type;
    //   const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    //   if (!validImageTypes.includes(fileType)) {
    //     this.fileSizeError = 'Only PNG, JPEG, and JPG formats are allowed.';
    //     this.selectedImages = [];
    //     this.selectedFileNames = [];
    //     this.selectedFiles = [];
    //     return;
    //   }

    //   if (file.size > maxSizeBytes) {
    //     this.selectedImages = [];
    //     this.selectedFileNames = [];
    //     this.selectedFiles = [];
    //     this.fileSizeError =
    //       'The selected file exceeds the maximum allowed size (5MB).';
    //     return;
    //   }

    //   const reader = new FileReader();
    //   this.selectedFileNames = [file.name];
    //   this.selectedFiles = [file];

    //   reader.onload = () => {
    //     if (typeof reader.result === 'string' || reader.result === null) {
    //       const id = this.generateUniqueId();
    //       const imageSrc = reader.result as string;
    //       const image = new Image();
    //       image.src = imageSrc;

    //       image.onload = () => {
    //         if (image.height > maxHeight) {
    //           this.selectedImages = [];
    //           this.selectedFileNames = [];
    //           this.selectedFiles = [];
    //           this.fileSizeError =
    //             'The selected image dimensions exceed the maximum allowed size';
    //         } else {
    //           this.selectedImages = [{ imageSrc, id }];
    //           this.fileSizeError = '';
    //         }
    //       };
    //     }
    //   };

    //   reader.readAsDataURL(file);
    // }
  }

  async fillViewForm(response: any) {
    this.staffview = this.formBuilder.group({
      // image: [response.image],
      name: [response.name],
      email: [response.email],
      mobile: [response.mobile],
      department: [response.department.name],
      role: [response.role.name],
    });

    // const file = await this.createFile(response.image);
    // if (file) {
    //   const maxSizeBytes = 5000000;
    //   const maxHeight = 700;
    //   const fileType = file.type;
    //   const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    //   if (!validImageTypes.includes(fileType)) {
    //     this.fileSizeError = 'Only PNG, JPEG, and JPG formats are allowed.';
    //     this.selectedImages = [];
    //     this.selectedFileNames = [];
    //     this.selectedFiles = [];
    //     return;
    //   }

    //   if (file.size > maxSizeBytes) {
    //     this.selectedImages = [];
    //     this.selectedFileNames = [];
    //     this.selectedFiles = [];
    //     this.fileSizeError =
    //       'The selected file exceeds the maximum allowed size (5MB).';
    //     return;
    //   }

    //   const reader = new FileReader();
    //   this.selectedFileNames = [file.name];
    //   this.selectedFiles = [file];

    //   reader.onload = () => {
    //     if (typeof reader.result === 'string' || reader.result === null) {
    //       const id = this.generateUniqueId();
    //       const imageSrc = reader.result as string;
    //       const image = new Image();
    //       image.src = imageSrc;

    //       image.onload = () => {
    //         if (image.height > maxHeight) {
    //           this.selectedImages = [];
    //           this.selectedFileNames = [];
    //           this.selectedFiles = [];
    //           this.fileSizeError =
    //             'The selected image dimensions exceed the maximum allowed size';
    //         } else {
    //           this.selectedImages = [{ imageSrc, id }];
    //           this.fileSizeError = '';
    //         }
    //       };
    //     }
    //   };

    //   reader.readAsDataURL(file);
    // }
  }

  async createFile(url: string) {
    const fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
    const response = await fetch(url);
    const data = await response.blob();
    const metadata = { type: 'image/jpeg' };
    const file = new File([data], fileName, metadata);
    return file;
  }

  bannermodal() {
    this.staffcreateopen = true;
    this.selectedImages = [];
    this.selectedFileNames = [];
    this.selectedFiles = [];
  }

  closeModal() {
    this.staffcreateopen = false;
    this.staffcreate.reset();
    this.staffupdateopen = false;
    this.staffviewopen = false;
  }

  ClickexamModalconent(event: Event): void {
    event.stopPropagation();
  }

  async Status(id: string, status: any) {
    const actionMessage = status ? 'activated' : 'deactivated';
    let type = 'User';
    this.employeeService
      .changestatuss(id, status, type)
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.successName = actionMessage;
          this.ngOnInit();
          setTimeout(() => {
            this.openSecondsuccess = true;
            setTimeout(() => {
              this.openSecondsuccess = false;
            }, 1800);
          }, 200);
        }
      });
  }

  openUploadModal() {
    this.uploadModalOpen = true;
    this.uploadForm.reset();
    this.selectedUploadFile = null;
    this.selectedUploadFileName = '';
  }

  closeUploadModal() {
    this.uploadModalOpen = false;
    this.selectedUploadFile = null;
    this.selectedUploadFileName = '';
  }

  onUploadFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedUploadFile = file;
      this.selectedUploadFileName = file.name;
      this.uploadForm.get('file')?.markAsTouched();
      this.uploadForm.get('file')?.updateValueAndValidity();
    }
  }

  uploadFile() {
    if (this.uploadForm.invalid || !this.selectedUploadFile) {
      this.uploadForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append(
      'file',
      this.selectedUploadFile,
      this.selectedUploadFile.name
    );

    this.employeeService.uploadStaffFile(formData).subscribe({
      next: (res) => {
        this.closeUploadModal();
        this.uploadForm.get('file')?.reset();
        this.notificationService.show(res.message, 'success', 3000);
        this.GetStaff();
      },
      error: () => {
        this.notificationService.show('File upload failed', 'error', 3000);
      },
    });
  }
}
