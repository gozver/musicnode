import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { forkJoin } from 'rxjs';

import { UserService } from '@shared/services/user.service';
import { BandService } from '@shared/services/band.service';
import { CompanyService } from '@shared/services/company.service';
import { UserRoleService } from '@shared/services/user-role.service';

import { User } from '@shared/interfaces/user.interface';
import { Band } from '@shared/interfaces/band.interface';
import { Company } from '@shared/interfaces/company.interface';
import { UserRole } from '@shared/interfaces/user-role.interface';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  roleForm: FormGroup;

  usersList: User[] = [];
  bandsList: Band[] = [];
  companiesList: Company[] = [];
  musiciansURList: UserRole[] = [];
  contractorsURList: UserRole[] = [];
  admisURList: UserRole[] = [];
  
  roleSelect:  { id: number, value: string }[] = [
    { id: 1, value: 'All Users' },
    { id: 2, value: 'Musicians' },
    { id: 3, value: 'Bands'     },
    { id: 4, value: 'Companies' },
    { id: 5, value: 'Independent Contractors' },
    { id: 6, value: 'Administrators' }
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly bandService: BandService,
    private readonly companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.initComponentData();
    this.initRoleForm();
  }

  initComponentData(): void {
    forkJoin([
      this.userService.getUsers(),
      this.bandService.getBands(),
      this.companyService.getCompanies(),
    ]).subscribe(([ usersList, bandsList, companiesList ]) => {
      this.usersList = usersList;
      this.bandsList = bandsList;
      this.companiesList = companiesList;

      console.log('--> this.usersList:');
      console.log(this.usersList);
      console.log('--> this.bandsList:');
      console.log(this.bandsList);
      console.log('--> this.companiesList:');
      console.log(this.companiesList);
    });
  }

  initRoleForm(): void {
    this.roleForm = this.fb.group({
      roleId: null
    });
  }
}
