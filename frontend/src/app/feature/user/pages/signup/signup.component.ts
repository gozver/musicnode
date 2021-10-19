import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initSignupForm();
  }

  initSignupForm(): void {
    this.signupForm = this.fb.group({
      name:      [ '',   Validators.required ], // , Validators.minLength(3)
      surname:   [ '',   Validators.required ],
      email:     [ '',   Validators.required ],
      phone:     [ '',   Validators.required ],
      password:  [ '',   Validators.required ],
      avatar:    [ '',   Validators.required ],
      role:      [ null, Validators.required ],
      adminCode: '',
    });
  }

  signup(): void {
    console.log(this.signupForm.value)
  }
}
