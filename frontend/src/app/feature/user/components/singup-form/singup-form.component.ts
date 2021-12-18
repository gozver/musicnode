import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-singup-form',
  templateUrl: './singup-form.component.html',
  styleUrls: ['./singup-form.component.scss']
})
export class SingupFormComponent implements OnInit {
  @Input() signupForm: FormGroup;
  @Input() signupFormError: boolean;

  rolesList: any[];

  ngOnInit(): void {
    this.rolesList = [
      { id: 1, name: 'band', value: 'Band' },
      { id: 2, name: 'company', value: 'Company' },
      { id: 3, name: 'admin', value: 'Admin' }
    ];
  }
  
  checkSignUpError(): string {
    if (this.signupFormError)
      return 'border-red';
    
    return 'border-gray'
  }
}
