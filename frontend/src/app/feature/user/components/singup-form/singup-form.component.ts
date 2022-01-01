import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-singup-form',
  templateUrl: './singup-form.component.html',
  styleUrls: ['./singup-form.component.scss']
})
export class SingupFormComponent implements OnInit {
  @Input() signupForm: FormGroup;

  rolesList: any[];

  ngOnInit(): void {
    this.rolesList = [
      { id: 1, name: 'band', value: 'Band' },
      { id: 2, name: 'company', value: 'Company' },
      { id: 3, name: 'contractor', value: 'Contractor' },
      { id: 4, name: 'admin', value: 'Admin' }
    ];
  }

  setCodeValidator(): void {
    if(+this.signupForm.value.roleId === 4 && this.signupForm.value.code === '') {
      this.signupForm.controls['code'].setErrors({ 'incorrect': true });
    } else {
      this.signupForm.controls['code'].setErrors(null);
    }
  }
}
