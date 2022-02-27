import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class EditAdComponent implements OnInit, OnDestroy {
  imagesList$ = new BehaviorSubject([]);

  paramId: number;
  subscription: any;
  currentUser: User;
  ad: any;

  adForm: FormGroup;
  imagesForm: FormGroup;

  isMyAd: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly adService: AdService,
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
  ) { }

  ngOnInit(): void {
    this.initImagesForm();
    this.getComponentData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getComponentData(): void {
    this.currentUser = this.authService.currentUser$.value;

    this.subscription = this.route.queryParams.subscribe(params => {
      this.paramId = +params['id'] || null;

      if (this.paramId) {
        this.adService.getAd(this.paramId).subscribe(ad => {
          console.log('--> ad:', ad);

          if (ad) {
            this.initAdForm(ad);
            
            this.ad = ad;
            this.isMyAd = this.currentUser.id === parseInt(this.ad.user.id);
            this.imagesList$.next(this.ad.images);

            this.roleService.getRolesByUserId(this.currentUser.id).subscribe(rolesList => {
              this.isAdmin = rolesList.filter(item => item.roleId === 4).length > 0;
              
              console.log('-> this.isAdmin:', this.isAdmin);
              console.log('-> this.isMyAd:', this.isMyAd);

              if (!this.isMyAd && !this.isAdmin) {
                this.router.navigate(['/ad']);
              }
            });
          } else {
            this.router.navigate(['/ad']);
          }
        });
      } else {
        this.router.navigate(['/ad']);
      }
    });
  }

  initAdForm(ad: any): void {
    this.adForm =  this.fb.group({
      id:       [ ad.id ],
      title:    [ ad.title,    [ Validators.required, Validators.minLength(3) ]],
      price:    [ ad.price,    [ Validators.required, Validators.pattern('^[0-9]+$') ]],
      location: [ ad.location, [ Validators.required, Validators.minLength(3) ]],
      desc:     [ ad.desc,     [ Validators.required, Validators.minLength(3) ]]
    });
  }

  initImagesForm(): void {
    this.imagesForm = new FormGroup({
      name:  new FormControl('ad'),
      images: new FormControl(null)
    });
  }

  uploadImages(event: any): void {
    const files: FileList = event.target.files;
    
    this.imagesForm.patchValue({ images: files });
    
    // Update images in backend
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

  updateAd(): void {
    this.adService.updateInfo(this.adForm.value).subscribe(() => {
      this.router.navigate(['/ad']);
    });
  }

  goBack() {
    this.router.navigate(['/ad']);
  }
}
