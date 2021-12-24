// Angular
import { Component, OnInit } from '@angular/core';

// Services and Interfaces
import { AdService } from '@app/shared/services/ad.service';
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
    this.adService.getAds().subscribe(res => {
      this.adsList = res;
      
      console.log('--> Get ads response:');
      console.log(this.adsList);
    });
  }

  createAd(ad: Ad): void {
    // Insert the element in the database
    this.adService.createAd(ad).subscribe(res => {
      console.log('--> Create ad response:');
      console.log(res);
      
      // If the ad is inserted in the db, add it to the adList array
      if (res) this.adsList = [res, ...this.adsList];
    });
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