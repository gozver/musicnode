import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { RoleService } from '@shared/services/role.service';
import { BandService } from '@shared/services/band.service';
import { CompanyService } from '@shared/services/company.service';
import { User } from '@shared/interfaces/user.interface';
import { ErrorDialogComponent } from '@shared/components/error-dialog/error-dialog.component'
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit, OnDestroy {
  rolesList$ = new BehaviorSubject([]);
  currentUser: User;

  bandForm: FormGroup;
  companyForm: FormGroup;
  roleForm: FormGroup;

  priceRegex: string = '^[0-9]+$';
  phoneRegex: string = '^[0-9\-]+$';
  emailRegex: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  roleDDL:  { id: number, value: string }[] = [
    { id: 1, value: 'Band' },
    { id: 2, value: 'Company' },
    { id: 3, value: 'Contractor' },
    { id: 4, value: 'Admin' }
  ];

  existsDDL:  { id: number, value: string }[] = [
    { id: 1, value: 'Yes' },
    { id: 2, value: 'No' }
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly bandService: BandService,
    private readonly companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.initComponentData();

    this.initBandForm();
    this.initCompanyForm();
    this.initRoleForm();
  }

  ngOnDestroy(): void {
    this.rolesList$.complete();
  }

  initComponentData(): void {
    this.currentUser = this.authService.currentUser$.value;

    this.roleService.getRolesByUserId(this.currentUser.id).subscribe(rolesList => {
      console.log('--> this.rolesList:', rolesList);
      this.rolesList$.next([...rolesList]);
    });
  }

  // Init Forms Functions
  initBandForm(): void {
    this.bandForm = this.fb.group({
      name:   [ '',   [ Validators.required, Validators.minLength(3) ]],
      desc:   [ '',   [ Validators.required, Validators.minLength(3) ]],
      email:  [ '',   [ Validators.required, Validators.pattern(this.emailRegex) ]],
      phone:  [ '',   [ Validators.required, Validators.pattern(this.phoneRegex) ]],
      price:  [ null, [ Validators.required, Validators.pattern(this.priceRegex) ]],
      type:   [ '',   [ Validators.required, Validators.minLength(3) ]],
      scope:  [ '',   [ Validators.required, Validators.minLength(3) ]],
      video:  [ '',   [ Validators.required, Validators.minLength(3) ]]
    });
  }

  initCompanyForm(): void {
    this.companyForm = this.fb.group({
      name:    [ '', [ Validators.required, Validators.minLength(3) ]],
      desc:    [ '', [ Validators.required, Validators.minLength(3) ]],
      email:   [ '', [ Validators.required, Validators.pattern(this.emailRegex) ]],
      phone:   [ '', [ Validators.required, Validators.pattern(this.phoneRegex) ]],
      address: [ '', [ Validators.required, Validators.minLength(3) ]],
    });
  }

  initRoleForm(): void {
    this.roleForm = this.fb.group({
      roleId: [ null ],
      userId: [ null ],
      code:   [ null ]
    });
  }

  // General component functions
  hasRole(): boolean {
    return this.currentUser.hasRole;
  }

  createBand(): void {
    this.bandService.createBand(this.bandForm.value, this.currentUser.id).subscribe(band => {
      this.userService.updateActiveRole(this.currentUser.id, 1).subscribe(user => {
        console.log('--> update active role:')
        console.log(user);
      });

      this.currentUser.hasRole = true;
      this.currentUser.activeRole = 1;

      this.authService.setCurrentUser(this.currentUser);
      this.authService.setHasRole(this.currentUser.hasRole);
      
      const role = {
        roleId: 1,
        role: "band",
        bandId: band.id,
        band: band,
        companyId: null,
        company: null,
        userId: this.currentUser.id,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }

      this.rolesList$.next([...this.rolesList$.value, role]);
    });
  }

  createCompany(): void {
    this.companyService.createCompany(this.companyForm.value, this.currentUser.id).subscribe(() => {
      this.userService.updateActiveRole(this.currentUser.id, 1).subscribe(user => {
        console.log('--> update active role:')
        console.log(user);

        this.currentUser.hasRole = true;
        this.currentUser.activeRole = 2;
  
        this.authService.setCurrentUser(this.currentUser);
        this.authService.setHasRole(this.currentUser.hasRole);
      });
    });
  }

  buttonIsDisabled(): boolean {
    var roleId = parseInt(this.roleForm.value.roleId);

    if (roleId === 1 && this.bandForm.valid) return false;
    
    if (roleId === 2 && this.companyForm.valid) return false;

    if (roleId === 3) return false;
    
    if (roleId === 4) if (this.roleForm.value.code) return false;

    return true;
  }

  createRole(): void {
    this.roleForm.value.userId = this.currentUser.id;

    this.roleService.createRole(this.roleForm.value, this.bandForm.value, this.companyForm.value).subscribe(
      role => {
        if (role) {
          console.log('--> new role:', role);

          this.rolesList$.next([...this.rolesList$.value, role]);

          this.roleForm.reset();
          this.bandForm.reset();
          this.companyForm.reset();
        }
      },
      error => {
        console.error(`--> error code: ${error.error.err.code}`);
        console.error(`--> error message: ${error.error.err.message}`);
        console.error('--> error objet:', error);

        /**
         * @definition Opens a mat dialog
         * @param1 Component to show inside the dialog
         * @param2 Data sent to the component
         */
        this.dialog.open(
          ErrorDialogComponent, { 
          data: { 
            title: 'Create Role Error',
            code: error.error.err.code,
            message: error.error.err.message 
          }
        });
      });
  }

  deleteRole(id: number): void {
    this.roleService.deleteRole(id).subscribe(res => {
      console.log('--> delete role response:', res);

      this.rolesList$.next([...this.rolesList$.value.filter(item => item.id !== id)]);
    });
  }
}
