import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@shared/services/auth.service';
import { RoleService } from '@shared/services/role.service';
import { BandService } from '@shared/services/band.service';
import { User } from '@app/shared/interfaces/user.interface';

@Component({
  selector: 'app-edit-band-profile',
  templateUrl: './edit-band-profile.component.html',
  styleUrls: ['./edit-band-profile.component.scss']
})
export class EditBandProfileComponent implements OnInit {
  profileId: number;
  profileBand: any;
  currentUser: User;

  updateForm: FormGroup;

  isAdmin: boolean = false;
  isMyBand: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
    private readonly bandService: BandService,
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

      this.bandService.getBand(this.profileId).subscribe(
        band => {
          this.profileBand = band[0];
          this.initBandForm();

          // !! => Parse to boolean
          this.isMyBand = !!this.profileBand.users.find((user: { id: number; }) => user.id === this.currentUser.id);

          console.log('--> profile band:');
          console.log(this.profileBand);
          console.log('--> is my band:');
          console.log(this.isMyBand);

          if (!this.isAdmin && !this.isMyBand) {
            console.error('--> unauthorized');
            console.error('--> redirect to home');
            // this.router.navigate(['/home']);
          }
        }, 
        error => {
          console.error('--> unauthorized');
          console.error('--> redirect to home');
          console.error('--> error:', error);
          // this.router.navigate(['/home']);
        }
      );
    });
  }

  initBandForm(): void {
    const priceRegex = '^[0-9]+$';
    const phoneRegex = '^[0-9\-]+$';
    
    this.updateForm = this.fb.group({
      id:    [ this.profileBand.id ],
      name:  [ this.profileBand.name,  [ Validators.required, Validators.minLength(3) ]],
      desc:  [ this.profileBand.desc,  [ Validators.required, Validators.minLength(3) ]],
      phone: [ this.profileBand.phone, [ Validators.required, Validators.pattern(phoneRegex) ]],
      price: [ this.profileBand.price, [ Validators.required, Validators.pattern(priceRegex) ]],
      type:  [ this.profileBand.type,  [ Validators.required, Validators.minLength(3) ]],
      scope: [ this.profileBand.scope, [ Validators.required, Validators.minLength(3) ]],
      video: [ this.profileBand.video, [ Validators.required, Validators.minLength(3) ]],
    });
  }

  update(): void {
    this.bandService.updateInfo(this.updateForm.value).subscribe(() => {
      this.router.navigate([`/profile/band/${this.profileId}`]);
    });
  }

  goBack() {
    this.router.navigate([`/profile/band/${this.profileId}`]);
  }
}
