import { Component, Input } from '@angular/core';

import { Ad } from '@shared/interfaces/ad.interface';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent {
  @Input() ad!: Ad;

  deleteAd(id: any): void {
    console.log(id)
  }
}
