import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BandService } from '@app/shared/services/band.service';

@Component({
  selector: 'app-band-profile',
  templateUrl: './band-profile.component.html',
  styleUrls: ['./band-profile.component.scss']
})
export class BandProfileComponent implements OnInit {
  profileId: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly bandService: BandService
  ) { 
    this.profileId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    console.log('--> this.profileId');
    console.log(this.profileId);

    this.bandService.getBand(this.profileId).subscribe(
      band => {
        console.log('--> band:');
        console.log(band);
      },
      error => {
        console.error("--> the band doesn't exist");
        console.error('--> error:', error);

        this.router.navigate(['/home']);
      }
    );
  }

}
