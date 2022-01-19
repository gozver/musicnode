import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@shared/services/auth.service';
import { BandService } from '@shared/services/band.service';
import { CompanyService } from '@shared/services/company.service';
import { UserRoleService } from '@shared/services/user-role.service';
import { User } from '@shared/interfaces/user.interface';
import { UserRole } from '@shared/interfaces/user-role.interface';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  currentUser: User;

  roleForm: FormGroup;
  bandForm: FormGroup;
  companyForm: FormGroup;
  userRoleForm: FormGroup;

  selectNoRole:  { id: number, value: string }[] = [
    { id: 1, value: 'Band'    },
    { id: 2, value: 'Company' },
  ];

  selectAddRole: { id: number, value: string }[] = [
    { id: 4, value: 'Contractor ' },
    { id: 5, value: 'Admin ' },
  ];

  userRolesList: UserRole[] = [];

  priceRegex: string = '^[0-9]+$';
  phoneRegex: string = '^[0-9\-]+$';
  emailRegex: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly bandService: BandService,
    private readonly companyService: CompanyService,
    private readonly userRoleService: UserRoleService
  ) { }

  ngOnInit(): void {
    this.initComponentData();

    this.initRoleForm();
    this.initBandForm();
    this.initCompanyForm();
  }

  initComponentData(): void {
    this.authService.currentUser$.subscribe(currentUser => this.currentUser = currentUser);

    this.selectNoRole = [
      { id: 1, value: 'Band ' },
      { id: 2, value: 'Company' },
    ];

    // this.userRoleService.findByUserId(this.currentUser.id).subscribe(userRolesList => {
    //   this.userRolesList = userRolesList

    //   console.log('--> this.userRolesList:');
    //   console.log(this.userRolesList);
    // })
  }

  initRoleForm(): void {
    this.roleForm = this.fb.group({
      roleId: [ null , Validators.required ],
    });
  }

  hasRole(): boolean {
    return this.currentUser.hasRole;
  }

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

  createBand(): void {
    this.bandService.createBand(this.bandForm.value, this.currentUser.id).subscribe(() => {
      this.currentUser.hasRole = true;
      this.authService.setCurrentUser(this.currentUser);
    });
  }

  createCompany(): void {
    this.companyService.createCompany(this.companyForm.value, this.currentUser.id).subscribe(() => {
      this.currentUser.hasRole = true;
      this.authService.setCurrentUser(this.currentUser);
    });
  }

  createContractorRole(): void {
    this.userRoleForm = this.fb.group({
      userId: this.currentUser.id,
      roleId: 4,
      bandId: null,
      companyId: null
    });

    this.userRoleService.createUserRole(this.userRoleForm.value).subscribe(
      ()=> this.roleForm.patchValue({ roleId: null })
    );
  }

  createAdminRole(): void {
    this.userRoleForm = this.fb.group({
      userId: this.currentUser.id,
      roleId: 5,
      bandId: null,
      companyId: null
    });

    this.userRoleService.createUserRole(this.userRoleForm.value).subscribe(()=> this.roleForm.patchValue({ roleId: null }));
  }
}
