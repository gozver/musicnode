// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Angular Material
import { MatDialog } from '@angular/material/dialog';

// Services and Components
import { AuthService } from '@shared/services/auth.service';
import { ErrorDialogComponent } from '@shared/components/error-dialog/error-dialog.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog    
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    const eRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    const pRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    this.loginForm = this.fb.group({
      email:    [ '', [ Validators.required, Validators.pattern(eRegex) ]],
      password: [ '', [ Validators.required, /* Validators.pattern(pRegex) */, Validators.minLength(6) ]],
    });
  } 

  login(): void {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        res => {
          // console.log('--> Login response:');
          // console.log(res);
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
              title: 'Login Error',
              operation: 'Login',
              code: err.error.err.code,
              message: err.error.err.message 
            }
          });
        }
      );
  }
}
