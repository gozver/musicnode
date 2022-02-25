import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { environment } from '@environments/environment';
import { AdService } from '@shared/services/ad.service';
import { AuthService } from '@shared/services/auth.service';
import { RoleService } from '@shared/services/role.service';
import { User } from '@shared/interfaces/user.interface';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.scss']
})
export class EditAdComponent implements OnInit {
  imagesList$ = new BehaviorSubject([]);

  paramId: number;
  subscription: any;
  ad: any;

  currentUser: User;
  imagesForm: FormGroup;

  isAdmin: boolean = false;
  isMyBand: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly adService: AdService,
    private readonly authService: AuthService,
    private readonly roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.initImagesForm();
    this.getComponentData();
  }

  // This form is used to upload band images
  initImagesForm(): void {
    this.imagesForm = new FormGroup({
      name:  new FormControl('ad'),
      images: new FormControl(null)
    });
  }

  getComponentData(): void {
    this.currentUser = this.authService.currentUser$.value;

    this.subscription = this.route.queryParams.subscribe(params => {
      this.paramId = +params['id'] || null;

      console.log('--> this.paramId:', this.paramId);
      
      if (this.paramId) {
        this.adService.getAd(this.paramId).subscribe(ad => {
          this.ad = ad;
          this.imagesList$.next(this.ad.images);
        });
      }

      this.roleService.getRolesByUserId(this.currentUser.id).subscribe(rolesList => {
        this.isAdmin = rolesList.filter(item => item.roleId === 4).length > 0;
      });
    });
  }

  uploadImages(event: any): void {
    const files: FileList = event.target.files;
    
    // Update images in backend
    this.imagesForm.patchValue({ images: files });

    this.adService.updateImages(this.ad.id, this.imagesForm.value.images).subscribe(imagesList => {
      console.log('--> uploaded files:');
      console.log(imagesList);

      // Update images in frontend
      let newImagesList: any = imagesList;

      for (let i = 0; i < newImagesList.length; i++) {
        const path = newImagesList[i].path.replace('public', environment.serverUrl);
        newImagesList[i].image = path;
      }

      this.imagesList$.next(newImagesList);
    });
  }

  deleteImages(): void {
    // Delete images in backend
    this.adService.deleteImages(this.ad.id).subscribe(res => {
      console.log('--> res:');
      console.log(res);

      // Delete images in frontend
      this.imagesList$.next([]);
    });
  }
}
