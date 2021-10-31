// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  roleForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initSignupForm();
    this.initRoleForm();
  }

  initSignupForm(): void {
    this.signupForm = this.fb.group({
      name:      [ '', Validators.required ], // , Validators.minLength(3)
      surname:   [ '', Validators.required ],
      email:     [ '', Validators.required ],
      phone:     [ '', Validators.required ],
      password:  [ '', Validators.required ],
      // adminCode: '',
    });
  }

  signup(): void {
    this.authService
      .signup(this.signupForm.value)
      .subscribe(() => {
        this.authService
          .login(this.signupForm.value.email, this.signupForm.value.password)
          .subscribe();
      });
  }

  initRoleForm(): void {
    this.roleForm = this.fb.group({
      id:     [ null, Validators.required ],
      userId: [ null, Validators.required ],
      role:   [ null, Validators.required ],
      avatar: [ '',   Validators.required ],
    });
  }

  role(): void {
    console.log(this.roleForm.value);
  }
}
