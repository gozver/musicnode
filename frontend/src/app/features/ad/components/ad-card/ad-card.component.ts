// Angular
import { Component, Input, Output, EventEmitter } from '@angular/core';

// Services
import { AuthService } from '@app/shared/services/auth.service';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss']
})
export class AdCardComponent {
  @Input() ad: any;
  @Output() delete = new EventEmitter<number>();

  userId: number;

  constructor(        
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.userId$.value;
  }

  deleteAd(adId: number): void {
    this.delete.emit(adId);
  }
}
