// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthService } from '@shared/services/auth.service';
import { BandService } from '@app/shared/services/band.service';
import { RoleService } from '@app/shared/services/role.service';

// Models
import { Band } from '@shared/interfaces/band.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupStep: number;

  signupForm: FormGroup;
  roleForm: FormGroup;
  bandForm: FormGroup;
  
  signupFormError: boolean;
  bandFormError: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly bandService: BandService,
    private readonly roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.signupStep = 1;
    
    this.signupFormError = false;
    this.initSignupForm();

    this.initRoleForm();

    this.bandFormError = false;
    this.initBandForm();
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

  initRoleForm(): void {
    this.bandForm = this.fb.group({
      name:   [ '', Validators.required ]
    });
  }

  initBandForm(): void {
    this.bandForm = this.fb.group({
      name:   [ '', Validators.required ],
      desc:   [ '', Validators.required ],
      phone:  [ '', Validators.required ],
      price:  [ '', Validators.required ],
      type:   [ '', Validators.required ],
      scope:  [ '', Validators.required ],
      email:  [ '', Validators.required ],
      video:  [ '', Validators.required ],
      avatar: [ '', Validators.required ]
    });
  }

  goToStep1(): void {
    this.signupStep = 1;
    this.signupForm.reset();
    this.bandForm.reset();
  }

  goToStep2(): void {
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
          console.log('--> Signup response:');
          console.log(signupRes);

          // login
          // this.authService
          //   .login(
          //     this.signupForm.value.email,
          //     this.signupForm.value.password
          //   )
            // .subscribe(loginRes => {
            //   console.log('--> Login response:');
            //   console.log(loginRes);
            // });
          
          // // create role
          // console.log('--> this.signupForm.value.role:');
          // console.log(this.signupForm.value.role);

          // this.roleService
          //   .create(this.signupForm.value.role, loginRes.id)
          //   .subscribe(res => {
          //     console.log('--> Create role response:');
          //     console.log(res);
          //   });

          // // create band
          // this.bandService
          //   .create(this.bandForm.value)
          //   .subscribe(res => {
          //     console.log('--> Create band response:');
          //     console.log(res);
          //   });
        } else {
          this.signupFormError = true;
        }
      });
  }
}
