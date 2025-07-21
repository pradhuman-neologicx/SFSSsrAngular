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
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  OtpVerify,
  SendOtp,
  SignINRes,
  SignIn,
} from 'src/app/core/model-class/login-signup';
import { Validations } from 'src/app/core/model-class/validations';
import { JwtService } from 'src/app/core/services/jwt.service';
import { LoginService } from 'src/app/core/services/login.service';
// import { ApiService } from 'src/app/core/services/api.service';
// import { DataService } from 'src/app/core/services/data.service';
// import { JwtService } from 'src/app/core/services/jwt.service';
// import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
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
  ],
})
export class SigninComponent {
  title = 'Login';
  login!: string;

  Onselectlogin(value: any) {
    this.login = value;
  }
  signIn!: FormGroup;
  openSecondsuccess: boolean = false;
  successName: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    // private apiservice: ApiService,
    // private dataService: DataService,
    private jwtService: JwtService,

    private loginService: LoginService
  ) {}
  // validation: Validations = new Validations();
  loginAS!: number;
  email_pattern = '^[A-Za-z0-9_.]+@[a-zA-Z]+(\\.[a-zA-Z]{2,4})+$';
  ngOnInit(): void {
    // this.jwtService.clearStorage();
    this.signIn = this.formBuilder.group({
      Email: [
        '',
        [Validators.required, Validators.pattern(this.email_pattern)],
      ],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
    });
  }

  // SignIn: SignIn = new SignIn();
  // SignINRes: SignINRes = new SignINRes();
  errorMessage: any;
  showErrorMessage: boolean = false;
  submitted!: boolean;
  isAdminLogin: boolean = false;
  loginType!: number;
  sessionId!: string;

  markAllAsTouched() {
    for (const control in this.signIn.controls) {
      if (this.signIn.controls.hasOwnProperty(control)) {
        this.signIn.controls[control].markAsTouched();
      }
    }
  }
  password: string = 'password';
  show: boolean = false;

  closeModal() {
    this.openSecondsuccess = false;
  }

  AdminLoginfun() {
    this.router.navigate(['admin/dashboard']);
    this.errorMessage = '';
    // if (this.signIn.valid) {
    //   const formData: FormData = new FormData();
    //   formData.append('identifier', this.signIn.get('Email')?.value);
    //   formData.append('password', this.signIn.get('Password')?.value);
    //   formData.append('type', 'admin');
    //   formData.forEach((value, key) => {
    //     console.log(`${key}:`, value);
    //   });
    //   this.loginService.AdminLoginapi(formData).subscribe((response: any) => {
    //     this.errorMessage = response.message;
    //     if (response.status === 200) {
    //       this.closeModal();
    //       this.submitted = true;
    //       this.successName = 'Login';
    //       setTimeout(() => {
    //         this.openSecondsuccess = true;
    //         setTimeout(() => {
    //           this.openSecondsuccess = false;
    //           this.jwtService.savepanelUserId(response.user.id);
    //           this.jwtService.saveadminame(response.user.name);
    //           this.jwtService.saveAdminToken(response.token);
    //           this.jwtService.isLoggedIn(true);
    //           this.ngOnInit();
    //           this.router.navigate(['/dashboard']); // Move the navigation here
    //         }, 1800); // Wait for 1.8 seconds before navigating
    //       }, 200); // Initial delay for showing the modal
    //     } else {
    //       this.submitted = false;
    //     }
    //   });
    // } else {
    //   this.submitted = false;
    //   this.errorMessage = 'please select all fields';
    //   this.signIn.markAllAsTouched();
    //   console.log(this.findInvalidControls(this.signIn));
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
}
