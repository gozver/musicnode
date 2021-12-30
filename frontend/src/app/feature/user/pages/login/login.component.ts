// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  loginError: boolean;
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loginError = false;
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email:     [ '', Validators.required ],
      password:  [ '', Validators.required ],
    });
  } 

  login(): void {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        res => {
          console.log('--> Login response:');
          console.log(res);
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
          
          this.loginError = true;
        }
      );
  }

  signup(): void { 
    this.router.navigate(['/user/signup']);
  }
}
