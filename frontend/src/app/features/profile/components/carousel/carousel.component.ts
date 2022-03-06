import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit {
  @Input() data: Observable<any>;

  imagesList: any[] = [];
  
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
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.data.subscribe(imagesList => {
      this.imagesList = [...imagesList];
      this.cd.markForCheck();
    });
  }
}
