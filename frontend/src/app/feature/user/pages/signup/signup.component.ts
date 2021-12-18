// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthService } from '@shared/services/auth.service';
import { BandService } from '@app/shared/services/band.service';
import { RoleService } from '@app/shared/services/role.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupStep: number;

  signupForm: FormGroup;
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
      // avatar: [ '', Validators.required ]
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

          // create band
          this.bandService
            .create(this.bandForm.value)
            .subscribe(createBandRes => {
              console.log('--> Create band response:');
              console.log(createBandRes);
            });

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
}
