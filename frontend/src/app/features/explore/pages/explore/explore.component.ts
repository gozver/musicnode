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
  searchForm: FormGroup;

  currentUser: User = null;
  searchResults: any[] = [];

  usersList: User[] = [];
  bandsList: Band[] = [];
  companiesList: Company[] = [];
  musiciansList: User[] = [];
  contractorsList: User[] = [];
  adminsList: User[] = [];
  
  roleSelect:  { id: number, value: string }[] = [
    { id: -1,  value: 'All Users' },
    { id: 1,  value: 'Bands' },
    { id: 2,  value: 'Companies' },
    { id: 3,  value: 'Contractors' },
    { id: 4,  value: 'Administrators' }
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
    this.initSearchForm();
    this.resetSearchResults();
  }

  initComponentData(): void {
    this.currentUser = this.authService.currentUser$.value;

    // forkJoin([
    //   this.userService.getUsers(),
    //   this.bandService.getBands(),
    //   this.companyService.getCompanies(),
    // ]).subscribe(([ usersList, bandsList, companiesList ]) => {
    //   this.usersList = usersList;
    //   this.bandsList = bandsList;
    //   this.companiesList = companiesList;
    // });
  }

  initSearchForm(): void {
    this.searchForm = this.fb.group({
      name:   [ '' ],
      email:  [ '' ],
      roleId: [ null ],
    });
  }

  resetSearchResults(): void {
    this.searchForm.get('roleId').valueChanges.subscribe(() => this.searchResults = []);
  }

  search(): void {
    switch (parseInt(this.searchForm.value.roleId)) {
      case 1:
        this.bandService.getBandsByParams(this.searchForm.value).subscribe(bands => this.searchResults = bands);
        break;

      case 2:
        this.companyService.getCompaniesByParams(this.searchForm.value).subscribe(companies => this.searchResults = companies);
        break;
        
      case 3:
      case 4:
      default:
        this.userService.getUsersByParams(this.searchForm.value).subscribe(users => this.searchResults = users);
    }
  }

  goToProfile(role: string, id: number): void {
    this.router.navigate([`/profile/${role}/${id}`]);
  }

  sendMessage(id: number): void {
    this.router.navigate(['/chat'], { queryParams: { id: id } });
  }
}
