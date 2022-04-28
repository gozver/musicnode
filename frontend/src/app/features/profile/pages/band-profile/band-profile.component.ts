import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer} from '@angular/platform-browser';

import { BehaviorSubject } from 'rxjs';

import { environment } from '@environments/environment';
import { AuthService } from '@shared/services/auth.service';
import { RoleService } from '@shared/services/role.service';
import { BandService } from '@shared/services/band.service';
import { ReviewService } from '@shared/services/review.service';
import { User } from '@shared/interfaces/user.interface';

@Component({
  selector: 'app-band-profile',
  templateUrl: './band-profile.component.html',
  styleUrls: ['./band-profile.component.scss']
})
export class BandProfileComponent implements OnInit {
  imagesList$ = new BehaviorSubject([]);
  reviewsList$ = new BehaviorSubject([]);

  profileId: number;
  profileBand: any;
  currentUser: User;
  
  avatarForm: FormGroup;
  imagesForm: FormGroup;
  reviewForm: FormGroup;
  
  isAdmin: boolean = false;
  isMyBand: boolean = false;
  
  imageData: string;
  avatarSelected: boolean = false;
  videoIsEmbeded: boolean = false;

  ratingsList: { value: number }[] = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer,
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
    private readonly bandService: BandService,
    private readonly reviewService: ReviewService,
  ) { 
    this.profileId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.initComponentData();
    this.initReviewForm();
  }
  
  // This form is used to upload the band avatar
  initAvatarForm(profileBand: any): void {
    this.avatarForm = new FormGroup({
      name:   new FormControl(profileBand.name),
      avatar: new FormControl(profileBand.avatar)
    });
  }

  // This form is used to upload band images
  initImagesForm(profileBand: any): void {
    this.imagesForm = new FormGroup({
      name:  new FormControl(profileBand.name),
      images: new FormControl(null)
    });
  }

  initReviewForm(): void {
    this.reviewForm = this.fb.group({
      rating: [ null, [ Validators.required ]],
      body:   [ '',   [ Validators.required, Validators.minLength(3) ]],
      userId: [ null ],
      bandId: [ null ]
    });
  }

  initComponentData(): void {
    this.currentUser = this.authService.currentUser$.value;

    this.roleService.getRolesByUserId(this.currentUser.id).subscribe(rolesList => {
      this.isAdmin = rolesList.filter(item => item.roleId === 4).length > 0;
    });

    this.bandService.getBand(this.profileId).subscribe(
      band => {
        this.profileBand = band[0];
        this.imageData = this.profileBand.avatar;

        this.imagesList$.next(this.profileBand.images);

        this.initAvatarForm(this.profileBand);
        this.initImagesForm(this.profileBand);

        // !! => Parse to boolean
        this.isMyBand = !!this.profileBand.users.find((user: { id: number; }) => user.id === this.currentUser.id);

        // 1) Modify video URL to embed in the HTML: replace('watch?v=', 'embed/')
        // 2) Angular DomSanitizer:
        // https://stackoverflow.com/questions/47193997/im-trying-to-dynamically-change-the-url-of-an-iframe-but-im-getting-an-error-un/47194242
        this.profileBand.video = this.profileBand.video.replace('watch?v=', 'embed/');
        this.profileBand.video = this.sanitizer.bypassSecurityTrustResourceUrl(this.profileBand.video);
        this.videoIsEmbeded = true;
        
        this.reviewService.getReviews(this.profileBand.id).subscribe(reviewsList => {
          this.reviewsList$.next(reviewsList);
        });
      },
      error => {
        console.error('--> error:');
        console.error(error);

        this.router.navigate(['/home']);
      }
    );
  }

  onAvatarSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    this.avatarSelected = true;
    this.avatarForm.patchValue({ avatar: file });

    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      
      reader.onload = () => {
        this.imageData = reader.result as string;
      }

      reader.readAsDataURL(file);
    }
  }

  updateAvatar(): void {
    this.bandService.updateAvatar(this.profileBand.id, this.avatarForm.value.avatar).subscribe(avatar => {
      this.imageData = avatar;
      this.profileBand.avatar = avatar;
      this.avatarSelected = false;
    });
  }

  uploadImages(event: any): void {
    const files: FileList = event.target.files;
    
    // Update images in backend
    this.imagesForm.patchValue({ images: files });

    this.bandService.updateImages(this.profileBand.id, this.imagesForm.value.images).subscribe(imagesList => {
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
    this.bandService.deleteImages(this.profileBand.id).subscribe(res => {
      // Delete images in frontend
      this.imagesList$.next([]);
    });
  }

  sendMessage(id: number): void {
    this.router.navigate(['/chat'], { queryParams: { id } });
  }

  goToEditProfile() {
    this.router.navigate([`/profile/band/${this.profileId}/edit`]);
  }

  createReview(): void {
    this.reviewForm.value.userId = this.currentUser.id;
    this.reviewForm.value.bandId = this.profileBand.id;

    // Ad the new review to db
    this.reviewService.createReview(this.reviewForm.value).subscribe(review => {
      const newReview = {
        id: review.id,
        body: this.reviewForm.value.body,
        rating: this.reviewForm.value.rating,
        userId: this.currentUser.id,
        bandId: this.profileBand.id,
        user: {
          name: this.currentUser.name,
          surname: this.currentUser.surname,
          avatar: this.currentUser.avatar
        },
        createdAt: Date.now()
      }

      // Ad the new review to the reviewsList array
      this.reviewsList$.next([newReview, ...this.reviewsList$.value ]);

      // Reset the form
      this.reviewForm.reset();
    });
  }

  deleteReview(id: number): void {
    // Delete the element from the database
    this.reviewService.deleteReview(id).subscribe(res => {
      // Delete the element from the reviewsList array
      this.reviewsList$.next([...this.reviewsList$.value.filter(item => item.id !== id)]);
    });
  }
}