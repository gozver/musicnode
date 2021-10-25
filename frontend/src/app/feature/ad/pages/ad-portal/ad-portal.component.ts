import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs'

import { AdService } from '@app/shared/services/ad.service';
import { AuthService } from '@app/shared/services/auth.service';

import { Ad } from '@shared/interfaces/ad.interface';
import { User } from '@shared/interfaces/user.interface';

@Component({
  selector: 'app-ad-portal',
  templateUrl: './ad-portal.component.html',
  styleUrls: ['./ad-portal.component.scss']
})
export class AdPortalComponent implements OnInit {
  // adsList$!: Observable<Ad[]>;
  // userId!: Pick<User, 'id'>;

  constructor(
    private readonly adService: AdService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    // this.adsList$ = this.getAds();
    // this.userId = this.authService.userId;
  }

  // getAds(): Observable<Ad[]> {
  //   return this.adService.getAds();
  // }

  // createAd(newAd: any): void {
  //   console.log(newAd);
  //   this.adsList$ = this.getAds();
  // }

  // delete(adId: Pick<Ad, 'id'>): void {
  //   this.adService.deleteAd(adId).subscribe(() => this.adsList$ = this.getAds());
  // }
}