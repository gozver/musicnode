import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { forkJoin } from 'rxjs';

import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { BandService } from '@shared/services/band.service';
import { CompanyService } from '@shared/services/company.service';

import { User } from '@shared/interfaces/user.interface';
import { Band } from '@shared/interfaces/band.interface';
import { Company } from '@shared/interfaces/company.interface';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  roleForm: FormGroup;

  currentUser: User = null;
  usersList: User[] = [];
  bandsList: Band[] = [];
  companiesList: Company[] = [];
  musiciansList: User[] = [];
  contractorsList: User[] = [];
  adminsList: User[] = [];
  
  roleSelect:  { id: number, value: string }[] = [
    { id: 1, value: 'All Users' },
    { id: 2, value: 'Musicians' },
    { id: 3, value: 'Bands'     },
    { id: 4, value: 'Companies' },
    { id: 5, value: 'Contractors' },
    { id: 6, value: 'Administrators' }
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly bandService: BandService,
    private readonly companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.initComponentData();
    this.initRoleForm();
  }

  initComponentData(): void {
    this.currentUser = this.authService.currentUser$.value;

    forkJoin([
      this.userService.getUsers(),
      this.bandService.getBands(),
      this.companyService.getCompanies(),
    ]).subscribe(([ usersList, bandsList, companiesList ]) => {
      this.usersList = usersList;
      this.bandsList = bandsList;
      this.companiesList = companiesList;

      this.musiciansList = this.usersList.filter(item => item.activeRole === 1);
      this.contractorsList = this.usersList.filter(item => item.activeRole === 4);
      this.adminsList = this.usersList.filter(item => item.activeRole === 5);
    });
  }

  initRoleForm(): void {
    this.roleForm = this.fb.group({ roleId: null });
  }

  goToProfile(role: string, id: number): void {
    this.router.navigate([`/profile/${role}/${id}`]);
  }

  sendMessage(id: number): void {
    this.router.navigate(['/chat'], { queryParams: { id: id } });
  }
}
