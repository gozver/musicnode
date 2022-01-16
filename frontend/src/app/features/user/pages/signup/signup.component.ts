import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

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
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initSignupForm();  
  }
  
  initSignupForm(): void {
    const phoneRegex = '^[0-9\-]+$';
    const emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    const passwdRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    
    this.signupForm = this.fb.group({
      name:     [ '',   [ Validators.required, Validators.minLength(3) ]],
      surname:  [ '',   [ Validators.required, Validators.minLength(3) ]],
      email:    [ '',   [ Validators.required, Validators.pattern(emailRegex) ]],
      phone:    [ '',   [ Validators.required, Validators.pattern(phoneRegex) ]],
      password: [ '',   [ Validators.required, Validators.pattern(passwdRegex) ]],
      roleId:   [ null, [ Validators.required ]],
      code:     [ '' ]
    });
  }

  signup(): void {
    this.authService.signup(this.signupForm.value).subscribe(
      () => {          
        this.authService.login(this.signupForm.value.email, this.signupForm.value.password).subscribe();
      }, 
      err => {
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

/**
 * Password RegEx:
 * (?=^.{8,}$) # at least 8 characters 
 * (?=.*\d)    # at least a digit
 * (?=.*\W+)   # one or more "non word" characters (\W is equivalent to [^a-zA-Z0-9_])
 * (?![.\n])   # no . or newline
 * (?=.*[A-Z]) # at least an upper case letter
 * (?=.*[a-z]) # at least a lower case letter
 */