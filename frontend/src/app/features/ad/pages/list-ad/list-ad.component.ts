import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '@shared/services/auth.service';
import { AdService } from '@shared/services/ad.service';
import { User } from '@shared/interfaces/user.interface';
import { Ad } from '@shared/interfaces/ad.interface';

import { AdDialogComponent } from '@features/ad/components/ad-dialog/ad-dialog.component';

@Component({
  selector: 'app-ad',
  templateUrl: './list-ad.component.html',
  styleUrls: ['./list-ad.component.scss']
})
export class ListAdComponent implements OnInit {
  currentUser: User;

  adForm: FormGroup;
  adsList: Ad[] = [];

  constructor(
    public dialog: MatDialog,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly adService: AdService
  ) { }

  ngOnInit(): void {
    this.getComponentData();
    this.initAdForm();
  }

  getComponentData(): void {
    this.currentUser = this.authService.currentUser$.value;
    this.adService.getAds().subscribe(adsList => this.adsList = adsList);
  }

  initAdForm(): void {
    this.adForm = this.fb.group({
      title:    [ '',   [ Validators.required ]],
      price:    [ null, [ Validators.required, Validators.pattern('^[0-9]*$') ]],
      location: [ '',   [ Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ]*$') ]],
      desc:     [ '',   [ Validators.required ]],
      userId:   [ null ]
    });
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
        this.adForm.value.userId = this.currentUser.id;

        // Insert the element in the database
        this.adService.createAd(this.adForm.value).subscribe(ad => {
          console.log('--> Create ad response:');
          console.log(ad);
          
          // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          //   this.router.navigate(['/ad']);
          // });

          // If the ad is inserted in the db, add it to the adList array
          ad.user = this.currentUser;
          ad.images = []
          this.adsList = [ad, ...this.adsList];

          // Clear the form after adding the new ad
          this.adForm.reset();
        });
      }
    });
  }

  editAd(id: number): void {
    this.router.navigate(['/ad/edit'], { queryParams: { id: id } });
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