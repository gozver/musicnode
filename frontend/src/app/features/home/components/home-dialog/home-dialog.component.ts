import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-home-dialog',
  templateUrl: './home-dialog.component.html',
  styleUrls: ['./home-dialog.component.scss']
})
export class HomeDialogComponent implements OnInit {
  userForm: FormGroup;
  
  constructor(
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm(): void {
    const phoneRegex = '^[0-9\-]+$';
    const eRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

    this.userForm = this.fb.group({
      name:    [ '', [ Validators.required, Validators.minLength(3) ]],
      email:   [ '', [ Validators.required, Validators.pattern(eRegex) ]],
      phone:   [ '', [ Validators.required, Validators.pattern(phoneRegex) ]],
      message: [ '', [ Validators.required, Validators.minLength(3) ]],
    });
  } 
}
