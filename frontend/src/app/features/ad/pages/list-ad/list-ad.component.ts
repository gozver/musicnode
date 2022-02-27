import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '@shared/services/auth.service';
import { AdService } from '@shared/services/ad.service';
import { User } from '@shared/interfaces/user.interface';
import { Ad } from '@shared/interfaces/ad.interface';

import { environment } from '@environments/environment';
import { AdDialogComponent } from '@features/ad/components/ad-dialog/ad-dialog.component';

@Component({
  selector: 'app-ad',
  templateUrl: './list-ad.component.html',
  styleUrls: ['./list-ad.component.scss']
})
export class ListAdComponent implements OnInit {
  currentUser: User;
  adsList: Ad[] = [];

  adForm: FormGroup;
  imagesForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly adService: AdService
  ) { }

  ngOnInit(): void {
    this.initAdForm();
    this.initImagesForm();
    this.getComponentData();
  }

  getComponentData(): void {
    this.currentUser = this.authService.currentUser$.value;
    this.adService.getAds().subscribe(adsList => {
      this.adsList = adsList;

      console.log('--> this.adsList: ');
      console.log(this.adsList);
    });
  }

  initAdForm(): void {
    this.adForm = this.fb.group({
      title:    [ '',   [ Validators.required, Validators.minLength(3) ]],
      price:    [ null, [ Validators.required, Validators.pattern('^[0-9]+$') ]],
      location: [ '',   [ Validators.required, Validators.minLength(3) ]],
      desc:     [ '',   [ Validators.required, Validators.minLength(3) ]],
      userId:   [ null ],
      images:   [ null ]
    });
  }

  initImagesForm(): void {
    this.imagesForm = new FormGroup({
      name:  new FormControl('ad'),
      images: new FormControl(null)
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

        // Insert the ad in the database
        this.adService.createAd(this.adForm.value).subscribe(ad => {
          console.log('--> Create ad response:');
          console.log(ad);

          // Insert ad images in the database
          const files: FileList = this.adForm.value.images;
          this.imagesForm.patchValue({ images: files });

          this.adService.updateImages(ad.id, this.imagesForm.value.images).subscribe(imagesList => {
            console.log('--> uploaded files:');
            console.log(imagesList);
      
            // Update adsList in the frontend
            ad.user = this.currentUser;
            ad.images = [];

            imagesList.forEach((item: { originalname: any; }) => {
              const image = {
                adId: ad.id,
                image: `${environment.serverUrl}/images/${item.originalname}`,
                createdAt: Date.now(),
                updatedAt: Date.now(),
              }

              ad.images = [...ad.images, image];
            });

            this.adsList = [ad, ...this.adsList];

            // Clear the form after adding the new ad
            this.adForm.reset();
          });
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