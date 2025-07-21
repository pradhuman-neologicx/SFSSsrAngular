import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { EmployeeService } from 'src/app/core/services/Employee.service';
// import { DataService } from 'src/app/core/services/data.service';
// import { JwtService } from 'src/app/core/services/jwt.service';

interface MenuItem {
  index: number;
  icon: string;
  label: string;
  route: string;
  subItems?: MenuItem[];
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  menuItems: MenuItem[] = [];
  @Input() collapsed: boolean = false;
  @Input() isMobile: boolean = false;
  @Output() closeSidenav = new EventEmitter<void>();

  // constructor(private route: ActivatedRoute, private jwtService: JwtService,
  //   private employeeService: EmployeeService, private router: Router, private dataService: DataService) {
  //   this.paneluserId = this.jwtService.getpanelUserId();
  //   this.dataService.currentMessage.subscribe((message) => {
  //     if (JSON.stringify(message).includes("Porfileupdated")) {
  //       if (this.paneluserId != undefined) {
  //         this.GetProfiledetails();
  //       }
  //     }
  //   });
  // }

  // isExpanded(route: string): boolean {
  //   const currentRoute = this.route.snapshot.url.join('/');
  //   return currentRoute.startsWith(route);
  // }

  // expandedIndex: number | null = null;

  // isExpanded(index: number,): boolean {
  //   return this.expandedIndex === index;
  // }
  // toggleSubmenu(index: number): void {
  //   if (this.expandedIndex=== index) {
  //     this.expandedIndex = null;
  //   } else {
  //     this.expandedIndex = index;
  //   }
  // }

  ProfilePicSizeClass(): string {
    return this.collapsed ? 'profile-pic-small' : 'profile-pic-large';
  }

  ShortnameB(): string {
    return this.collapsed ? 'shortname-small-b' : 'shortname-big-b';
  }

  Shortname(): string {
    return this.collapsed ? 'shortname-small' : 'shortname-big';
  }

  sideNavCollapsed(): boolean {
    return this.collapsed;
  }

  loginAS!: number;
  paneluserId!: String;
  roles: any;
  ngOnInit(): void {
    this.menuItems = [
      {
        index: 1,
        icon: 'home',
        label: 'Dashboard',
        route: 'dashboard',
      },
      {
        index: 2,
        icon: 'supervisor_account',
        label: 'User Management',
        route: 'user-management',
        subItems: [
          {
            index: 1,
            icon: 'group',
            label: 'Staff',
            route: 'user-management/staff',
          },
        ],
      },
      {
        index: 3,
        icon: 'assignment',
        label: 'Test Management',
        route: 'test-management',
      },
      // {
      //   index: 4,
      //   icon: 'business',
      //   label: 'Equipment Management',
      //   route: 'equipment',
      // },
      {
        index: 5,
        icon: 'import_contacts',
        label: 'Test Master',
        route: 'test-master',
      },
      {
        index: 6,
        icon: 'insights',
        label: 'Test Results',
        route: 'test-result',
      },
      {
        index: 7,
        icon: 'ads_click',
        label: 'Report',
        route: 'report',
      },
      {
        index: 8,
        icon: 'account_balance_wallet	',
        label: 'Accounts Management',
        route: 'accounts',
      },
    ];
  }

  //   ngOnInit(): void {
  //     // this.roles = this.jwtService.getRoles();
  //     // this.paneluserId = this.jwtService.getpanelUserId();
  //     if (this.paneluserId != undefined) {
  //         this.GetProfiledetails();
  //     }
  //     // this.ImageUrl = this.jwtService.getImageUrl();

  //     this.menuItems = [];

  //     this.roles.forEach((role:any) => {
  //         switch (role.roleName) {
  //             case 'Admin':
  //                 this.addAdminMenuItems();
  //                 break;
  //             case 'Front Office':
  //                 this.addFrontOfficeMenuItems();
  //                 break;
  //             case 'Back Office':
  //                 this.addBackOfficeMenuItems();
  //                 break;
  //             case 'Floor Incharge':
  //                 this.addFloorInchargeMenuItems();
  //                 break;
  //             case 'Account Executive':
  //                 this.addAccountExecutiveMenuItems();
  //                 break;
  //             case 'CEO':
  //                 this.addCeoMenuItems();
  //                 break;
  //             case 'Teacher':
  //                 this.addTeacherMenuItems();
  //                 break;
  //             case 'Test Series Executive':
  //                 this.addTestSeriesExecutiveMenuItems();
  //                 break;
  //             case 'Student':
  //                 this.addStudentMenuItems();
  //                 break;
  //         }
  //     });

  //     // Remove duplicate menu items (if any)
  //     this.menuItems = this.removeDuplicateMenuItems(this.menuItems);
  // }

  addAdminMenuItems() {
    this.menuItems.push(
      // {
      //   index: 1,
      //   icon: 'analytics',
      //   label: 'Dashboard',
      //   route: '/dashboard',
      // },
      {
        index: 2,
        icon: 'supervisor_account',
        label: 'User Management',
        route: 'users',
        subItems: [
          {
            index: 1,
            icon: 'person',
            label: 'Employee',
            route: 'users/employees',
          },

          // {
          //   index: 2,
          //   icon: 'person_add',
          //   label: 'Student',
          //   route: 'users/student'
          // },

          {
            index: 2,
            icon: 'group',
            label: 'Batches Assignment',
            route: 'users/batchesAssign',
          },
        ],
      },

      {
        index: 3,
        icon: 'supervisor_account',
        label: 'Master',
        route: 'master',
        subItems: [
          {
            index: 1,
            icon: 'import_contacts',
            label: 'Courses',
            route: 'master/courses',
          },

          {
            index: 2,
            icon: 'group',
            label: 'Batches',
            route: 'master/batches',
          },

          {
            index: 3,
            icon: 'school',
            label: 'Scholarships',
            route: 'master/scholarships',
          },

          {
            index: 4,
            icon: 'payment',
            label: 'Fees Master',
            route: 'master/fees',
          },

          {
            index: 5,
            icon: 'account_balance_wallet',
            label: 'Other fees master',
            route: 'master/otherfeesmaster',
          },
        ],
      },

      {
        index: 4,
        icon: 'supervisor_account',
        label: 'Session Management',
        route: 'session_management',
        subItems: [
          {
            index: 1,
            icon: 'event',
            label: 'Session',
            route: 'session_management/sessions',
          },

          {
            index: 2,
            icon: 'calendar_today',
            label: 'Calendar',
            route: 'session_management/calendar',
          },
          // {
          //   index: 3,
          //   icon: 'how_to_reg',
          //   label: 'Student Migrate',
          //   route: 'session_management/student_migrate',
          // },

          // {
          //   index: 4,
          //   icon: 'how_to_reg',
          //   label: 'Student Drop',
          //   route: 'session_management/student_drop',
          // },
        ],
      },

      {
        index: 5,
        icon: 'supervisor_account',
        label: 'Student Management',
        route: 'student_management',
        subItems: [
          {
            index: 1,
            icon: 'contact_support',
            label: 'Inquiry Management',
            route: 'student_management/inquiry_management',
          },

          {
            index: 2,
            icon: 'how_to_reg',
            label: 'Student Onboard',
            route: 'student_management/student_onboard',
          },

          {
            index: 3,
            icon: 'how_to_reg',
            label: 'Pending Fees Students',
            route: 'student_management/student_pending',
          },

          {
            index: 4,
            icon: 'how_to_reg',
            label: 'Students',
            route: 'student_management/all_students',
          },
        ],
      },

      {
        index: 6,
        icon: 'payment',
        label: 'Fees Management',
        route: 'fees',
        subItems: [
          {
            index: 1,
            icon: 'payment',
            label: 'Fee Collection',
            route: 'fees/fees_management',
          },
        ],
      },

      {
        index: 7,
        icon: 'how_to_reg',
        label: 'Attendance Management',
        route: 'attendance',
        subItems: [
          {
            index: 1,
            icon: 'person',
            label: 'Employee',
            route: 'attendance/employees',
          },
          {
            index: 2,
            icon: 'person',
            label: 'Student',
            route: 'attendance/student',
          },
        ],
      },

      // study-materual //

      {
        index: 8,
        icon: 'import_contacts',
        label: 'Study Material Configuration',
        route: 'study_material',
        subItems: [
          {
            index: 1,
            icon: 'person',
            label: 'Units',
            route: 'study_material/units',
          },

          // {
          //   index: 2,
          //   icon: 'person',
          //   label: 'Dispatch Material',
          //   route: 'study_material/dispatch',
          // },

          // {
          //   index: 2,
          //   icon: 'person',
          //   label: 'Dispatch Material',
          //   route: 'study_material/dispatch/dispatch_material',
          // },

          {
            index: 2,
            icon: 'person',
            label: 'Dispatch Material',
            route: 'study_material/dispatch/dispatch_material',
          },
        ],
      },

      // {
      //   index: 9,
      //   icon: 'payment',
      //   label: 'Class Routines',
      //   route: 'classes',
      // },

      {
        index: 10,
        icon: 'assessment',
        label: 'Test Series Management',
        route: 'test_Series',
        subItems: [
          {
            index: 1,
            icon: 'person',
            label: 'Test Master',
            route: 'test_Series/test_master',
          },
        ],
      },
      {
        index: 11,
        icon: 'assignment',
        label: 'Reports',
        route: 'reports',
        subItems: [
          {
            index: 1,
            icon: 'person',
            label: 'Walk-in / Onboarding',
            route: 'reports/walkin',
          },
          {
            index: 2,
            icon: 'date_range',
            label: 'Attendance',
            route: 'reports/attendance',
          },
          {
            index: 3,
            icon: 'description',
            label: 'Test Series',
            route: 'reports/test-series',
          },
          {
            index: 4,
            icon: 'description',
            label: 'Inquiry History',
            route: 'reports/historyreport',
          },
          {
            index: 5,
            icon: 'description',
            label: 'Onboard History',
            route: 'reports/onboard_history',
          },
        ],
      }
    );
  }

  addFrontOfficeMenuItems() {
    const studentManagementItem = {
      index: 2,
      icon: 'supervisor_account',
      label: 'Student Management',
      route: 'student_management',
      subItems: [
        {
          index: 1,
          icon: 'contact_support',
          label: 'Inquiry Management',
          route: 'student_management/inquiry_management',
        },
        {
          index: 2,
          icon: 'how_to_reg',
          label: 'Student Onboard',
          route: 'student_management/student_onboard',
        },
      ],
    };
    // Check if "Student Management" item already exists
    const exists = this.menuItems.some(
      (item: any) => item.label === studentManagementItem.label
    );

    // If it doesn't exist, add it
    if (!exists) {
      this.menuItems.push(studentManagementItem);
    }
  }
  addBackOfficeMenuItems() {
    const studentManagementItem = {
      index: 2,
      icon: 'supervisor_account',
      label: 'Student Management',
      route: 'student_management',
      subItems: [
        {
          index: 1,
          icon: 'contact_support',
          label: 'Inquiry Management',
          route: 'student_management/inquiry_management',
        },
        {
          index: 2,
          icon: 'how_to_reg',
          label: 'Student Onboard',
          route: 'student_management/student_onboard',
        },
      ],
    };
    // Check if "Student Management" item already exists
    const exists = this.menuItems.some(
      (item: any) => item.label === studentManagementItem.label
    );

    // If it doesn't exist, add it
    if (!exists) {
      this.menuItems.push(studentManagementItem);
    }
  }
  addFloorInchargeMenuItems() {
    const studentManagementItem = {
      index: 2,
      icon: 'how_to_reg',
      label: 'Attendance Management',
      route: 'attendance',
      subItems: [
        {
          index: 1,
          icon: 'person',
          label: 'Student',
          route: 'attendance/student',
        },
      ],
    };
    // Check if "Student Management" item already exists
    const exists = this.menuItems.some(
      (item: any) => item.label === studentManagementItem.label
    );

    // If it doesn't exist, add it
    if (!exists) {
      this.menuItems.push(studentManagementItem);
    }
  }
  addAccountExecutiveMenuItems() {
    const studentManagementItem = {
      index: 2,
      icon: 'supervisor_account',
      label: 'Student Management',
      route: 'student_management',
      subItems: [
        {
          index: 1,
          icon: 'how_to_reg',
          label: 'Pending Fees Students',
          route: 'student_management/student_pending',
        },
      ],
    };

    // Check if "Student Management" item already exists
    const existingIndex = this.menuItems.findIndex(
      (item: any) => item.label === studentManagementItem.label
    );

    // If it doesn't exist, add it
    if (existingIndex === -1) {
      this.menuItems.push(studentManagementItem);
    } else {
      // If it exists, merge the subItems
      const existingItem = this.menuItems[existingIndex];
      existingItem.subItems = (existingItem.subItems || []).concat(
        studentManagementItem.subItems
      );
      this.menuItems[existingIndex] = existingItem;
    }

    // Add other menu items as before
    this.menuItems.push({
      index: 1,
      icon: 'payment',
      label: 'Fees Management',
      route: 'fees',
      subItems: [
        {
          index: 1,
          icon: 'payment',
          label: 'Fee Collection',
          route: 'fees/fees_management',
        },
      ],
    });
  }

  addCeoMenuItems() {
    this.menuItems.push({
      index: 2,
      icon: 'assignment',
      label: 'Reports',
      route: 'reports',
      subItems: [
        {
          index: 1,
          icon: 'person',
          label: 'Walk-in / Onboarding',
          route: 'reports/walkin',
        },
        {
          index: 2,
          icon: 'date_range',
          label: 'Attendance',
          route: 'reports/attendance',
        },
        {
          index: 3,
          icon: 'description',
          label: 'Test Series',
          route: 'reports/test-series',
        },
      ],
    });
  }
  addTeacherMenuItems() {
    this.menuItems
      .push
      // Add the specific menu items for the front office role here
      ();
  }
  addTestSeriesExecutiveMenuItems() {
    this.menuItems.push({
      index: 1,
      icon: 'assessment',
      label: 'Test Series Management',
      route: 'test_Series',
      subItems: [
        {
          index: 1,
          icon: 'person',
          label: 'Test Master',
          route: 'test_Series/test_master',
        },
      ],
    });
  }
  addStudentMenuItems() {
    this.menuItems
      .push
      // Add the specific menu items for the front office role here
      ();
  }

  // Define similar methods for other roles

  removeDuplicateMenuItems(menuItems: any) {
    let uniqueItems: any;
    const seenRoutes = new Set();
    if (menuItems != undefined) {
      menuItems.forEach((item: any) => {
        if (item != undefined) {
          if (item.route != undefined) {
            if (!seenRoutes.has(item.route)) {
              uniqueItems.push(item);
              seenRoutes.add(item.route);
            }
          }
        }
      });
    }

    return uniqueItems;
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  closeSidebar() {
    this.collapsed = true;
  }
  ImageUrl!: String;

  name!: string;
  email!: string;
  // profilePhotoPath!:string;

  // GetProfiledetails() {
  //   const body = { "userId": this.paneluserId };
  //   this.employeeService.getProfiledetails(body).subscribe((response: any) => {
  //     console.log(response);
  //     if (response.statusCode === 200) {
  //       this.name = response.data.name;
  //       this.email = response.data.email;
  //       this.ImageUrl = response.data.profilePhotoPath;
  //       this.jwtService.saveImageUrl(response.data.profilePhotoPath);
  //     } else {
  //       console.error('Error occurred. Status code:', response.statusCode);
  //     }
  //   },);

  // }
  getShortName(user: any) {
    if (this.name != undefined) {
      if (this.name != null) {
        return this.name.charAt(0);
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  // old code of get profile details

  // Employerdetails: any;
  // GetProfiledetails() {
  //   const body ={"userId":this.paneluserId};
  //   this.employeeService
  //     .EmployeProfiledetails(body)
  //     .subscribe((response: any) => {
  //       if (response.statusCode === 200) {
  //         this.Employerdetails = response.data.name;
  //         this.Employerdetails = response.data.email;
  //         this.ImageUrl = response.data.profilePhotoPath;
  //       }
  //     });
  // }

  isExpanded: boolean = false;

  // Function to toggle the expansion state
  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }

  expandedSubmenu: string | null = null;

  isSubmenuExpanded(route: string): boolean {
    return this.expandedSubmenu === route;
  }

  toggleSubmenu(route: string): void {
    if (this.expandedSubmenu === route) {
      this.expandedSubmenu = null;
    } else {
      this.expandedSubmenu = route;
    }
  }
  closeSubmenu(): void {
    this.expandedSubmenu = null; // Close submenu
  }
}
