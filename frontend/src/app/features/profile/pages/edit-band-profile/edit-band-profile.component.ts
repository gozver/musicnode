import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '@shared/services/auth.service';
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

  updateForm: FormGroup;
  currentUser: User;

  constructor(
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly bandService: BandService,
  ) {
    this.profileId = parseInt(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    this.initComponentData();
  }

  initComponentData(): void {
    this.currentUser = this.authService.currentUser$.value;

    if (this.currentUser.activeRole !== 4 && this.profileId !== this.currentUser.id) {
      // this.router.navigate(['/home']);
      console.log('--> fail...')
    }

    this.bandService.getBand(this.profileId).subscribe(band => {
      this.profileBand = band[0];
      this.initBandForm();
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
    this.location.back();
  }
}
