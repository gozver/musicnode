import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '@shared/services/auth.service';
import { AdService } from '@shared/services/ad.service';
import { Ad } from '@shared/interfaces/ad.interface';

import { AdDialogComponent } from '@features/ad/components/ad-dialog/ad-dialog.component';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {
  userId: number;

  adForm: FormGroup;
  adsList: Ad[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly adService: AdService,
    private readonly fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initAdForm();
    this.getComponentData();
  }

  initAdForm(): void {
    this.adForm = this.fb.group({
      title:       [ '',   [ Validators.required ]],
      price:       [ null, [ Validators.required, Validators.pattern('^[0-9]*$') ]],
      location:    [ '',   [ Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ]*$') ]],
      description: [ '',   [ Validators.required ]],
      userId:      null
    });
  }

  getComponentData(): void {
    this.userId = this.authService.userId$.value;
    this.adService.getAds().subscribe(ads => this.adsList = ads);
  }

  openDialog() {
    const dialogRef = this.dialog.open(
      AdDialogComponent,
      { data: { adForm: this.adForm} }
    );

    // user taps on popup create button: result = true
    // user taps on popup cancel button: result = false
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adForm.value.userId = this.userId;

        // Insert the element in the database
        this.adService.createAd(this.adForm.value).subscribe(res => {
          console.log('--> Create ad response:');
          console.log(res);
          
          // If the ad is inserted in the db, add it to the adList array
          if (res) this.adsList = [res, ...this.adsList];

          // Clear the form after adding the new ad
          this.adForm.reset();
        });
      }
    });
  }

  deleteAd(adId: number): void {
    // Delete the element from the database
    this.adService.deleteAd(adId).subscribe(res => {
      console.log('--> Delete ad response:');
      console.log(res);

      // If the ad is deleted in the db, remove from the adList array
      if (res) this.adsList = this.adsList.filter(item => item.id !== adId);
    });
  }
}