// Angular
import { Component, OnInit } from '@angular/core';

// Services
import { AdService } from '@app/shared/services/ad.service';

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
    private readonly adService: AdService
  ) { }

  ngOnInit(): void {
    // Get all ads from the database
    this.adService.getAds().subscribe((adsList) => {
      this.adsList = adsList
      
      console.log('--> adsList:');
      console.log(this.adsList);
    });
  }

  createAd(ad: Ad): void {
    // Insert the element in the database
    this.adService.createAd(ad).subscribe(res => {
      console.log('--> Create ad response:');
      console.log(res);
      
      // Add the new created ad to the adList array
      this.adsList = [ad, ...this.adsList];
    });
  }

  deleteAd(adId: number): void {
    // Delete the element from the database
    this.adService.deleteAd(adId).subscribe(res => {
      console.log('--> Delete ad response:');
      console.log(res);
    });
    
    // Delete the element from the adList array
    this.adsList = this.adsList.filter(item => item.id !== adId);
  }
}