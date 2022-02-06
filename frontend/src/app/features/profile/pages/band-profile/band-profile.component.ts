import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { OwlOptions } from 'ngx-owl-carousel-o';

import { AuthService } from '@shared/services/auth.service';
import { BandService } from '@app/shared/services/band.service';
import { User } from '@app/shared/interfaces/user.interface';

@Component({
  selector: 'app-band-profile',
  templateUrl: './band-profile.component.html',
  styleUrls: ['./band-profile.component.scss']
})
export class BandProfileComponent implements OnInit {
  profileId: number;
  profileBand: any;

  bandForm: FormGroup;
  currentUser: User;
  imageData: string;

  avatarSelected: boolean = false;
  isMyBand: boolean = false;

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
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly bandService: BandService
  ) { 
    this.profileId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(currentUser => {
      this.currentUser = currentUser;

      console.log('--> currentUser:');
      console.log(currentUser.id);
    });

    this.bandService.getBand(this.profileId).subscribe(
      band => {
        this.profileBand = band[0];
        this.imageData = this.profileBand.avatar;
        this.initUserForm(this.profileBand);

        console.log('--> band:');
        console.log(this.profileBand);

        // !! => parse to boolean
        this.isMyBand = !!this.profileBand.users.find(user => user.id === this.currentUser.id);

        console.log('--> this.isMyBand:');
        console.log(this.isMyBand);
      },
      error => {
        console.error("--> the band doesn't exist");
        console.error('--> error:', error);

        this.router.navigate(['/home']);
      }
    );
  }

  initUserForm(profileBand: any): void {
    this.bandForm = new FormGroup({
      name:   new FormControl(profileBand.name),
      avatar: new FormControl(profileBand.avatar)
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    this.avatarSelected = true;
    this.bandForm.patchValue({ avatar: file });

    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      
      reader.onload = () => {
        this.imageData = reader.result as string;
      }

      reader.readAsDataURL(file);
    }
  }

  updateImage(): void {
    this.bandService.updateAvatar(this.profileBand.id, this.bandForm.value.avatar).subscribe(avatar => {
      this.imageData = avatar;
      this.profileBand.avatar = avatar;
      this.avatarSelected = false;
    });
  }

  sendMessage(id: number): void {
    this.router.navigate(['/chat'], { queryParams: { id } });
  }
}
