import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@shared/services/auth.service';
import { BandService } from '@shared/services/band.service';
import { CompanyService } from '@shared/services/company.service';
import { RoleService } from '@shared/services/role.service';
import { User } from '@shared/interfaces/user.interface';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  // User related properties
  currentUser: User;

  // Form related properties
  roleForm: FormGroup;
  bandForm: FormGroup;
  companyForm: FormGroup;

  noRoleDdl:  { id: number, value: string }[] = [
    { id: 1, value: 'Band'    },
    { id: 2, value: 'Company' },
  ];

  addRoleDdl: { id: number, value: string }[] = [
    { id: 1, value: 'Musician ' },
    { id: 2, value: 'Band ' },
    { id: 3, value: 'Company ' },
    { id: 4, value: 'Contractor ' },
    { id: 5, value: 'Admin ' },
  ];

  // Regex related properties
  priceRegex: string = '^[0-9]+$';
  phoneRegex: string = '^[0-9\-]+$';
  emailRegex: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly bandService: BandService,
    private readonly companyService: CompanyService,
    private readonly roleService: RoleService,
  ) { }

  ngOnInit(): void {
    this.initComponentData();

    this.initRoleForm();
    this.initBandForm();
    this.initCompanyForm();
  }

  initComponentData(): void {
    this.authService.currentUser$.subscribe(currentUser => this.currentUser = currentUser);

    this.noRoleDdl = [
      { id: 1, value: 'Band ' },
      { id: 2, value: 'Company' },
    ];
  }

  // Init Forms Functions
  initRoleForm(): void {
    this.roleForm = this.fb.group({
      roleId: [ null , Validators.required ],
    });
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

  // General component functions
  hasRole(): boolean {
    return this.currentUser.hasRole;
  }

  createBand(): void {
    this.bandService.createBand(this.bandForm.value, this.currentUser.id).subscribe(() => {
      this.currentUser.hasRole = true;
      this.authService.setCurrentUser(this.currentUser);
      this.authService.setHasRole(this.currentUser.hasRole);
      this.authService.setActiveRole(2);
    });
  }

  createCompany(): void {
    this.companyService.createCompany(this.companyForm.value, this.currentUser.id).subscribe(() => {
      this.currentUser.hasRole = true;
      this.authService.setCurrentUser(this.currentUser);
      this.authService.setHasRole(this.currentUser.hasRole);
      this.authService.setActiveRole(3);
    });
  }

  createContractorRole(): void {
    
  }

  createAdminRole(): void {
    
  }
}
