import { Component, OnInit } from '@angular/core';

import { BandService } from '@shared/services/band.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bandsList: any[] = [];
  topBandsList: any[] = [];

  constructor(
    private readonly bandService: BandService
  ) { }

  ngOnInit(): void {
    this.initComponentData();
  }

  initComponentData(): void {
    this.bandService.getBands().subscribe(async (bandsList) =>  {
      this.bandsList = bandsList;

      const indexesList = await this.getIndexes();
      
      for (let i = 0; i < 6; i++) {
        const band = {
          name: this.bandsList[indexesList[i]].name,
          img: this.bandsList[indexesList[i]].images[0].image,
          avatar: this.bandsList[indexesList[i]].avatar 
        };
        
        this.topBandsList = [...this.topBandsList, band];
      }
    });
  }

  getIndexes() {
    let indexesList: number[] = [];

    while(indexesList.length < 6) {
      const index: number = Math.floor(Math.random() * this.bandsList.length);
      if(indexesList.indexOf(index) === -1) indexesList.push(index);
    }

    return indexesList;
  }
}
