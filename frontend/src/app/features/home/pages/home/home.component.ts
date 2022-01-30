import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { BandService } from '@shared/services/band.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  isMobileView: boolean = false;
  bandsList: any[] = [];
  topBandsList: any[] = [];

  constructor(
    private readonly bpObserver: BreakpointObserver,
    private readonly bandService: BandService
  ) { }

  ngOnInit(): void {
    this.initComponentData();
  }

  ngAfterViewInit() {
    this.setBreakPointObserver();
  }

  initComponentData(): void {
    this.bandService.getBands().subscribe(bandsList =>  {
      this.bandsList = bandsList;

      this.bandsList = this.shuffle(this.bandsList);

      const indexesList = this.getIndexes();
      
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

  setBreakPointObserver(): void {
    this.bpObserver.observe(['(max-width: 800px)']).subscribe((res) => {
      Promise.resolve().then(() => {
        if (res.matches) {
          this.isMobileView = true;
        } else {
          this.isMobileView = false;
        }
      });
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

  /**
   * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
   */
  shuffle(array: any[]): any[] {
    let currentIndex: number = array.length;
    let randomIndex: number;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
}
