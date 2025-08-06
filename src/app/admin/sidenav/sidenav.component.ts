import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { EmployeeService } from 'src/app/core/services/Employee.service';
// import { DataService } from 'src/app/core/services/data.service';
import { JwtService } from 'src/app/core/services/jwt.service';

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
  constructor(private jwtService: JwtService, private router: Router) {}
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
    this.roles = localStorage.getItem('Role');
    console.log('Roles:', this.roles);
    this.menuItems = [];

    if (this.roles == 'Admin') {
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
          route: 'user-management/staff',
        },
        {
          index: 4,
          icon: 'widgets',
          label: 'Master',
          route: '/admin/master',
          subItems: [
            {
              index: 1,
              icon: 'inventory_2',
              label: 'Material',
              route: '/admin/master/material',
            },
            {
              index: 2,
              icon: 'import_contacts',
              label: 'Test Configuration',
              route: 'test-configuration',
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
        //   index: 6,
        //   icon: 'insights',
        //   label: 'Test Results',
        //   route: 'test-result',
        // },
        {
          index: 8,
          icon: 'account_balance_wallet',
          label: 'Accounts Management',
          route: 'accounts',
        },
      ];
    } else if (this.roles == 'Engineer') {
      this.menuItems = [
        {
          index: 1,
          icon: 'home',
          label: 'Dashboard',
          route: 'dashboard',
        },
        {
          index: 3,
          icon: 'assignment',
          label: 'Test Management',
          route: 'engineer',
        },
      ];
    } else if (this.roles == 'Front Desk Receptionist') {
      this.menuItems = [
        {
          index: 1,
          icon: 'home',
          label: 'Dashboard',
          route: 'dashboard',
        },
        {
          index: 3,
          icon: 'assignment',
          label: 'Test Management',
          route: 'test-management',
        },
      ];
    } else if (this.roles == 'Accountant') {
      this.menuItems = [
        {
          index: 1,
          icon: 'home',
          label: 'Dashboard',
          route: 'dashboard',
        },
        {
          index: 8,
          icon: 'account_balance_wallet',
          label: 'Accounts Management',
          route: 'accounts',
        },
      ];
    }
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
