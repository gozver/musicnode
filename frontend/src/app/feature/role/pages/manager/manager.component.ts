// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { AuthService } from '@shared/services/auth.service';
import { BandService } from '@app/shared/services/band.service';
import { CompanyService } from '@app/shared/services/company.service';

// Models
import { User } from '@app/shared/interfaces/user.interface';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  roleForm: FormGroup;
  bandForm: FormGroup;
  companyForm: FormGroup;
  currentUser: User;

  rolesList: any[];

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly bandService: BandService,
    private readonly companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(currentUser => this.currentUser = currentUser);

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
      avatar: [ '' ]
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

  printValue(): void {
    console.log('--> this.roleForm.value.roleId:');
    console.log(this.roleForm.value.roleId);
  }
}
