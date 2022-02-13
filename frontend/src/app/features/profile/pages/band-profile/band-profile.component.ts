import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer} from '@angular/platform-browser';

import { OwlOptions } from 'ngx-owl-carousel-o';

import { AuthService } from '@shared/services/auth.service';
import { BandService } from '@shared/services/band.service';
import { ReviewService } from '@shared/services/review.service';
import { User } from '@app/shared/interfaces/user.interface';

@Component({
  selector: 'app-band-profile',
  templateUrl: './band-profile.component.html',
  styleUrls: ['./band-profile.component.scss']
})
export class BandProfileComponent implements OnInit {
  profileId: number;
  profileBand: any;
  currentUser: User;
  imageData: string;

  avatarForm: FormGroup;
  imagesForm: FormGroup;
  reviewForm: FormGroup;
  
  avatarSelected: boolean = false;
  isMyBand: boolean = false;
  videoIsEmbeded: boolean = false;

  reviewsList: any[] = [];

  ratingsList: { value: number }[] = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="material-icons">navigate_before</i>',
      '<i class="material-icons">navigate_next</i>'
    ],
    responsive: {
      0:    { items: 1 },
      400:  { items: 1 },
      740:  { items: 1 }
    },
    nav: true
  }
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer,
    private readonly authService: AuthService,
    private readonly bandService: BandService,
    private readonly reviewService: ReviewService,
  ) { 
    this.profileId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.initComponentData();
    this.initReviewForm();
  }
  
  initAvatarForm(profileBand: any): void {
    this.avatarForm = new FormGroup({
      name:   new FormControl(profileBand.name),
      avatar: new FormControl(profileBand.avatar)
    });
  }

  initImagesForm(profileBand: any): void {
    this.imagesForm = new FormGroup({
      name:  new FormControl(profileBand.name),
      image: new FormControl(null)
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

    this.bandService.getBand(this.profileId).subscribe(
      band => {
        this.profileBand = band[0];
        this.imageData = this.profileBand.avatar;

        this.initAvatarForm(this.profileBand);
        this.initImagesForm(this.profileBand);

        // !! => Parse to boolean
        this.isMyBand = !!this.profileBand.users.find((user: { id: number; }) => user.id === this.currentUser.id);

        console.log('--> profile band:');
        console.log(this.profileBand);
        console.log('--> this.isMyBand:');
        console.log(this.isMyBand);

        /**
         * 1) Modify video URL to embed in the HTML: replace('watch?v=', 'embed/')
         * 2) Angular DomSanitizer:
         * https://stackoverflow.com/questions/47193997/im-trying-to-dynamically-change-the-url-of-an-iframe-but-im-getting-an-error-un/47194242
         */ 
        this.profileBand.video = this.profileBand.video.replace('watch?v=', 'embed/');
        this.profileBand.video = this.sanitizer.bypassSecurityTrustResourceUrl(this.profileBand.video);
        this.videoIsEmbeded = true;
        
        console.log('--> sanitized profileBand video:');
        console.log(this.profileBand.video.changingThisBreaksApplicationSecurity);
        
        this.reviewService.getReviews(this.profileBand.id).subscribe(reviewsList => this.reviewsList = reviewsList);
      },
      error => {
        console.error('--> error:', error);

        this.router.navigate(['/home']);
      }
    );
  }

  selectAvatar(event: Event): void {
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

  uploadImages(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    
    console.log('--> selected images:');
    console.log(file);

    this.imagesForm.patchValue({ image: file });

    this.bandService.updateImages(this.profileBand.id, this.imagesForm.value.image).subscribe(res => {
      console.log('--> res:');
      console.log(res);

      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/profile/band/${this.profileBand.id}`]);
    });
    });
  }

  deleteImages(): void {
    this.bandService.deleteImages(this.profileBand.id).subscribe(res => {
      console.log('--> res:');
      console.log(res);
    });

    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/profile/band/${this.profileBand.id}`]);
    });
  }

  sendMessage(id: number): void {
    this.router.navigate(['/chat'], { queryParams: { id } });
  }

  createReview(): void {
    const newReview = {
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
    this.reviewsList = [newReview, ...this.reviewsList ];

    this.reviewForm.value.userId = this.currentUser.id;
    this.reviewForm.value.bandId = this.profileBand.id;

    // Ad the new review to db
    this.reviewService.createReview(this.reviewForm.value).subscribe();

    // Reset the form
    this.reviewForm.reset();
  }
}