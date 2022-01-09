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
      { id: 1, value: 'Musician' },
      { id: 2, value: 'Band or Company' },
      { id: 4, value: 'Independent Contractor' },
      { id: 5, value: 'Administrator' },
    ];
  }

  setCodeValidator(): void {
    if(+this.signupForm.value.roleId === 5 && this.signupForm.value.code === '') {
      this.signupForm.controls['code'].setErrors({ 'incorrect': true });
    } else {
      this.signupForm.controls['code'].setErrors(null);
    }
  }
}
