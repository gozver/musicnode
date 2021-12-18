// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthService } from '@shared/services/auth.service';
import { BandService } from '@app/shared/services/band.service';
import { CompanyService } from '@app/shared/services/company.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupStep: number;

  signupForm: FormGroup;
  signupFormError: boolean;

  bandForm: FormGroup;
  bandFormError: boolean;

  companyForm: FormGroup;
  companyFormError: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly bandService: BandService,
    private readonly companyService: CompanyService
    ) { }

  ngOnInit(): void {
    this.signupStep = 1;
    
    this.signupFormError = false;
    this.bandFormError = false;
    this.companyFormError = false;
    
    this.initSignupForm();
    this.initBandForm();
    this.initCompanyForm();
  }

  initSignupForm(): void {
    this.signupForm = this.fb.group({
      name:      [ '',   Validators.required ], // , Validators.minLength(3)
      surname:   [ '',   Validators.required ],
      email:     [ '',   Validators.required ],
      phone:     [ '',   Validators.required ],
      password:  [ '',   Validators.required ],
      roleId:    [ null, Validators.required ], // adminCode: '',
    });
  }

  initBandForm(): void {
    this.bandForm = this.fb.group({
      name:   [ '', Validators.required ],
      desc:   [ '', Validators.required ],
      phone:  [ '', Validators.required ],
      email:  [ '', Validators.required ],
      price:  [ '', Validators.required ],
      type:   [ '', Validators.required ],
      scope:  [ '', Validators.required ],
      video:  [ '', Validators.required ],
      // avatar: '',
    });
  }

  initCompanyForm(): void {
    this.companyForm = this.fb.group({
      name:    [ '', Validators.required ],
      desc:    [ '', Validators.required ],
      phone:   [ '', Validators.required ],
      email:   [ '', Validators.required ],
      address: [ '', Validators.required ],
      // avatar: '',
    });
  }

  goToStep1(): void {
    this.signupStep = 1;
  }

  goToStep2(): void {
    console.log('--> this.signupForm.value.roleId:');
    console.log(this.signupForm.value.roleId);

    if (this.signupForm.status === 'VALID') {
      this.signupFormError = false;
      this.signupStep = 2;
    } else {
      this.signupFormError = true;
      this.signupStep = 1;
    }
  }

  signup(): void {
    // signup
    this.authService
      .signup(this.signupForm.value)
      .subscribe((signupRes) => {
        if (signupRes) {
          // create band
          if (parseInt(this.signupForm.value.roleId) === 1) {
            this.bandService
              .create(this.bandForm.value)
              .subscribe(createBandRes => {
                console.log('--> Create band response:');
                console.log(createBandRes);

                this.clearData();
              });
          } else if (this.signupForm.value.roleId === 2) {
            this.companyService
              .create(this.companyForm.value)
              .subscribe(createComapnyRes => {
                console.log('--> Create company response:');
                console.log(createComapnyRes);

                this.clearData();
              });
          }

          // login
          this.authService
            .login(
              this.signupForm.value.email,
              this.signupForm.value.password
            )
            .subscribe(loginRes => {
              console.log('--> Login response:');
              console.log(loginRes);
            });
        } else {
          this.signupFormError = true;
        }
      });
  }

  clearData(): void {
    this.signupStep = 1;
    this.signupForm.reset();
    this.bandForm.reset();
    this.companyForm.reset();
  }
}
