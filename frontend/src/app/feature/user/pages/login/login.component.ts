// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginError: boolean;
  loginForm: FormGroup;
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
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
      .subscribe(res => {
        if (res) {
          console.log('--> Login response:');
          console.log(res);
        } else {
          this.loginError = true;
        }
      });
  }

  signup(): void { 
    this.router.navigate(['/user/signup']);
  }
}
