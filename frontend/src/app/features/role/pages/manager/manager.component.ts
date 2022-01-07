// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { AuthService } from '@shared/services/auth.service';
import { BandService } from '@app/shared/services/band.service';
import { CompanyService } from '@app/shared/services/company.service';
import { UserRoleService } from '@app/shared/services/user-role.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  roleForm: FormGroup;
  bandForm: FormGroup;
  companyForm: FormGroup;
  userRoleForm: FormGroup;
  userId: number;
  hasRole: boolean;

  rolesList: any[];

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly bandService: BandService,
    private readonly companyService: CompanyService,
    private readonly userRoleService: UserRoleService
  ) { }

  ngOnInit(): void {
    this.authService.userId$.subscribe(userId => this.userId = userId);
    this.authService.hasRole$.subscribe(hasRole => this.hasRole = hasRole);

    this.rolesList = [
      { id: 1, value: 'Band ' },
      { id: 2, value: 'Company' },
    ];

    this.initRoleForm();
    this.initBandForm();
    this.initCompanyForm();
  }

  initRoleForm(): void {
    this.roleForm = this.fb.group({
      roleId: [ null , Validators.required ],
    });
  }

  initBandForm(): void {
    this.bandForm = this.fb.group({
      name:   [ '', Validators.required ],
      desc:   [ '', Validators.required ],
      phone:  [ '', Validators.required ],
      email:  [ '', Validators.required ],
      price:  [ '', Validators.required ],
      type:   [ '', Validators.required ],
      scope:  [ '', Validators.required ],
      video:  [ '', Validators.required ],
      userId: [ null ]
    });
  }

  initCompanyForm(): void {
    this.companyForm = this.fb.group({
      name:    [ '', Validators.required ],
      desc:    [ '', Validators.required ],
      phone:   [ '', Validators.required ],
      email:   [ '', Validators.required ],
      address: [ '', Validators.required ],
      avatar:  [ '' ]
    });
  }

  createBand(): void {
    this.bandService.create(this.bandForm.value).subscribe(
      res => {
        console.log('--> res:');
        console.log(res);

        this.userRoleForm = this.fb.group({
          userId: this.userId,
          roleId: 1,
          bandId: res.id,
          companyId: null
        });

        this.userRoleService.create(this.userRoleForm.value).subscribe(
          () => {
            this.authService.updateHasRole(this.userId, true).subscribe(
              res => console.log('--> update has role response:', res),
              err => console.log('--> update has role error:', err)
            );
          },
          // err => console.log('--> create user role error:', err)
        );
      }
    );
  }

  createCompany(): void {
    this.companyService.create(this.companyForm.value).subscribe(
      res => {
        console.log('--> res:');
        console.log(res);

        this.userRoleForm = this.fb.group({
          userId: this.userId,
          roleId: 2,
          bandId: null,
          companyId: res.id
        });

        this.userRoleService.create(this.userRoleForm.value).subscribe(
          () => {
            this.authService.updateHasRole(this.userId, true).subscribe(
              res => console.log('--> update has role response:', res),
              err => console.log('--> update has role error:', err)
            );
          },
          // err => console.log('--> create user role error:', err)
        );
      }
    );
  }
}
