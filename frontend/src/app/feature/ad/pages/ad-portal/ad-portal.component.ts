// Angular
import { Component, OnInit } from '@angular/core';

// Services
import { AdService } from '@app/shared/services/ad.service';
import { AuthService } from '@app/shared/services/auth.service';

// Interfaces
import { Ad } from '@shared/interfaces/ad.interface';

@Component({
  selector: 'app-ad-portal',
  templateUrl: './ad-portal.component.html',
  styleUrls: ['./ad-portal.component.scss']
})
export class AdPortalComponent implements OnInit {
  adsList: Ad[] = [];
  userId: number;

  constructor(
    private readonly adService: AdService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.adService.getAds().subscribe((adsList) => {
      this.adsList = adsList;
    })
  }

  createAd(ad: Ad): void {
    // Insert the element in the database
    this.adService.createAd(ad).subscribe(res => console.log("Response:", res));
    // Ad the element at the begining of the adList array    
    this.adsList = [ad, ...this.adsList]
  }

  deleteAd(adId: number): void {
    // Delete the element from the database
    this.adService.deleteAd(adId).subscribe(res => console.log("Response:", res));
    // Delete the element from the adList array
    this.adsList = this.adsList.filter(item => item.id !== adId);
  }
}