import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OwlOptions } from 'ngx-owl-carousel-o';

import { BandService } from '@app/shared/services/band.service';

@Component({
  selector: 'app-band-profile',
  templateUrl: './band-profile.component.html',
  styleUrls: ['./band-profile.component.scss']
})
export class BandProfileComponent implements OnInit {
  profileId: number;
  profileBand: any;

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
    private readonly bandService: BandService
  ) { 
    this.profileId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.bandService.getBand(this.profileId).subscribe(
      band => {
        this.profileBand = band[0];

        console.log('--> band:');
        console.log(this.profileBand);
      },
      error => {
        console.error("--> the band doesn't exist");
        console.error('--> error:', error);

        this.router.navigate(['/home']);
      }
    );
  }
}
