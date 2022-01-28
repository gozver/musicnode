import { Component, OnInit } from '@angular/core';

import { BandService } from '@shared/services/band.service';
import { Band } from '@shared/interfaces/band.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bandsList: Band[] = [];

  topBandsList: any[] = [
    { name: 'Aerosmith', img: 'assets/img/aerosmith.jpg', avatar: 'assets/img/aerosmith-logo.svg' },
    { name: 'The Doors', img: 'assets/img/the-doors.jpg', avatar: 'assets/img/the-doors-logo.png' },
    { name: 'Guns N Roses', img: 'assets/img/guns-n-roses.jpg', avatar: 'assets/img/guns-n-roses-logo.jpg' },
    { name: 'Metallica', img: 'assets/img/metallica.jpg', avatar: 'assets/img/metallica-logo.jpg' },
    { name: 'Pearl Jam', img: 'assets/img/pearl-jam.jpg', avatar: 'assets/img/pearl-jam-logo.gif' },
    { name: 'ZZ Top', img: 'assets/img/zz-top.jpg', avatar: 'assets/img/zz-top-logo.jfif' }
  ];

  constructor(
    private readonly bandService: BandService
  ) { }

  ngOnInit(): void {
    this.initComponentData()
  }

  initComponentData(): void {
    this.bandService.getBands().subscribe(bandsList => {
      this.bandsList = bandsList;

      console.log('--> bandsList:');
      console.log(bandsList);

      bandsList.forEach(band => console.log(band.images[0].image))
    })
  }
}
