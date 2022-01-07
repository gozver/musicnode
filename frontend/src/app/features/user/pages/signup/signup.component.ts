// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

// Services and Components
import { AuthService } from '@shared/services/auth.service';
import { ErrorDialogComponent } from '@shared/components/error-dialog/error-dialog.component'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.initSignupForm();  
  }
  
  initSignupForm(): void {
    const eRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    const pRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    
    this.signupForm = this.fb.group({
      name:      [ '',   [ Validators.required, /* Validators.minLength(3) */ ]],
      surname:   [ '',   [ Validators.required, /* Validators.minLength(3) */ ]],
      email:     [ '',   [ Validators.required, Validators.pattern(eRegex) ]],
      phone:     [ '',   [ Validators.required, /* Validators.minLength(9) */ ]],
      password:  [ '',   [ Validators.required, /* Validators.pattern(eRegex) */ ]],
      roleId:    [ null, [ Validators.required ]],
      code:      [ '' ]
    });
  }

  signup(): void {
    this.authService
      .signup(this.signupForm.value)
      .subscribe(() => {          
        this.authService.login(this.signupForm.value.email, this.signupForm.value.password)
          .subscribe(loginRes => {
            console.log('--> Login response:');
            console.log(loginRes);
          });
        }, 
        err => {
          console.error('--> Login error:');
          console.error(err);

          /**
           * @definition Opens a mat dialog
           * @param1 Component to show inside the dialog
           * @param2 Data sent to the component
           */
          this.dialog.open(
            ErrorDialogComponent, { 
            data: { 
              title: 'Signup Error',
              operation: 'Signup',
              code: err.error.err.code,
              message: err.error.err.message 
            }
          });
        }
      );
  }
}
