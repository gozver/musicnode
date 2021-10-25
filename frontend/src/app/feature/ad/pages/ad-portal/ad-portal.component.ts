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

  // createAd(userId: number, title: string, description: string): void {
  //   // Insert the element in the database
  //   this.adService.createAd({ user_id: userId, title: title, description: description }).subscribe();
  //   // Ad the element at the begining of the adList array
  //   this.adsList.unshift(newAd);
  // }

  deleteAd(adId: number): void {
    // Delete the element from the database
    this.adService.deleteAd(adId).subscribe();
    // Delete the element from the adList array
    this.adsList = this.adsList.filter(item => item.id !== adId);
  }
}