import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { AuthService } from '@shared/services/auth.service';
import { AdService } from '@shared/services/ad.service';

import { User } from '@shared/interfaces/user.interface'

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss']
})
export class AdCardComponent {
  @Input() ad: any;
  @Output() delete = new EventEmitter<number>();

  imagesList$ = new BehaviorSubject([]);

  currentUser: User;

  constructor(        
    private readonly authService: AuthService,
    private readonly adService: AdService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser$.value;
    
    this.imagesList$.next(this.ad.images);
    
    console.log(`--> ad ${this.ad.id}:`);
    console.log(this.ad.images);
  }

  deleteAd(adId: number): void {
    this.delete.emit(adId);
  }
}
