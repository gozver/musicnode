import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initLoginForm();   
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email:     [ '', Validators.required ],
      password:  [ '', Validators.required ],
    });
  }

  login(): void {
    console.log(this.loginForm.value);
    
    // this.authService.signup(this.signupForm.value)
    //   .subscribe(res => console.log("Response:", res));
  }
}
