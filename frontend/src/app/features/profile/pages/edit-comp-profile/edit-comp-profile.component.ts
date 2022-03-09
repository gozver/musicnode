import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '@shared/services/auth.service';
import { RoleService } from '@shared/services/role.service';
import { CompanyService } from '@shared/services/company.service';
import { User } from '@app/shared/interfaces/user.interface';

@Component({
  selector: 'app-edit-comp-profile',
  templateUrl: './edit-comp-profile.component.html',
  styleUrls: ['./edit-comp-profile.component.scss']
})
export class EditCompProfileComponent implements OnInit {
  profileId: number;
  profileComp: any;
  currentUser: User;
  
  companyForm: FormGroup;

  isAdmin: boolean = false;
  isMyCompany: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
    private readonly companyService: CompanyService,
  ) {
    this.profileId = parseInt(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    this.initComponentData();
  }

  initComponentData(): void {
    this.currentUser = this.authService.currentUser$.value;

    this.roleService.getRolesByUserId(this.currentUser.id).subscribe(rolesList => {
      this.isAdmin = rolesList.filter(item => item.roleId === 4).length > 0;
      
      console.log('--> roles list:');
      console.log(rolesList);
      console.log('--> is admin:');
      console.log(this.isAdmin);

      this.companyService.getCompany(this.profileId).subscribe(
        company => {
          this.profileComp = company[0];
          this.initCompanyForm();
          
          // !! => Parse to boolean
          this.isMyCompany = !!this.profileComp.users.find((user: { id: number; }) => user.id === this.currentUser.id);
          
          console.log('--> profile company:');
          console.log(this.profileComp);
          console.log('--> is my company:');
          console.log(this.isMyCompany);

          if (!this.isAdmin && !this.isMyCompany) {
            console.error('--> unauthorized');
            console.error('--> redirect to home');
            this.router.navigate(['/home']);
          }
        }, 
        error => {
          console.error('--> error:');
          console.error(error);
          
          this.router.navigate(['/home']);
        }
      );
    });
  }

  initCompanyForm(): void {
    const phoneRegex = '^[0-9\-]+$';    
    
    this.companyForm = this.fb.group({
      id:      [ this.profileComp.id ],
      name:    [ this.profileComp.name,    [ Validators.required, Validators.minLength(3) ]],
      desc:    [ this.profileComp.desc,    [ Validators.required, Validators.minLength(3) ]],
      phone:   [ this.profileComp.phone,   [ Validators.required, Validators.pattern(phoneRegex) ]],
      address: [ this.profileComp.address, [ Validators.required, Validators.minLength(3) ]],
    });
  }

  update(): void {
    this.companyService.updateInfo(this.companyForm.value).subscribe(() => {
      this.router.navigate([`/profile/company/${this.profileId}`]);
    });
  }

  goBack(): void {
    this.router.navigate([`/profile/company/${this.profileId}`]);
  }
}
