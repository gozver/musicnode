import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { RoleService } from '@shared/services/role.service';
import { ErrorDialogComponent } from '@shared/components/error-dialog/error-dialog.component'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  id: number;
  role: any;
  userForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly roleService: RoleService
  ) {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.initComponentData();
  }

  initComponentData(): void {
    this.initUserForm();

    console.log('--> this.id:');
    console.log(this.id);

    this.roleService.getRoleById(this.id).subscribe(role => {
      this.role = role[0];

      console.log('--> this.role');
      console.log(this.role);
    });
  }

  initUserForm(): void {
    const emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

    this.userForm = this.fb.group({
      email: [ '', [ Validators.required, Validators.pattern(emailRegex) ]],
    });
  }

  addUser(): void {
    this.roleService.createRole(this.userForm.value.email, this.role).subscribe(
      res => {
        console.log('--> add user response:');
        console.log(res);

        this.router.navigate(['/role']);
      },
      err => {
        console.error('--> error code:');
        console.error(err.error.err.code);
        console.error('--> error message:');
        console.error(err.error.err.message);
        console.error('--> error objet:');
        console.error(err);

        /**
         * @definition Opens a mat dialog
         * @param1 Component to show inside the dialog
         * @param2 Data sent to the component
         */
         this.dialog.open(
          ErrorDialogComponent, { 
          data: { 
            title: 'Add User Error',
            code: err.error.err.code,
            message: err.error.err.message 
          }
        });
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/role']);
  }
}
