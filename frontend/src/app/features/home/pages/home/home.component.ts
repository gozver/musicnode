import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { BandService } from '@shared/services/band.service';

import { HomeDialogComponent } from '@features/home/components/home-dialog/home-dialog.component';

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
    private readonly router: Router,
    private readonly dialog: MatDialog,
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

      // Calculate average rating
      this.bandsList.forEach(band => {
        let averageRating = 0;

        band.reviews.forEach((review: { rating: number; }) => averageRating += review.rating);

        band.rating = averageRating / band.reviews.length;
      });

      // Top Band List
      const indexesList = this.getIndexes();
      
      for (let i = 0; i < 6; i++) {
        // default image if the band has no images
        const img = this.bandsList[indexesList[i]].images[0]
          ? this.bandsList[indexesList[i]].images[0].image
          : 'assets/img/no-photo.jpg';

        const band = {
          id: this.bandsList[indexesList[i]].id,
          name: this.bandsList[indexesList[i]].name,
          img: img,
          avatar: this.bandsList[indexesList[i]].avatar 
        };
        
        this.topBandsList = [...this.topBandsList, band];
      }
    });
  }

  setBreakPointObserver(): void {
    this.bpObserver.observe(['(max-width: 800px)']).subscribe((res) => {
      Promise.resolve().then(() => {
        res.matches
          ? this.isMobileView = true
          : this.isMobileView = false;
      });
    });
  }

  getIndexes() {
    let indexesList: number[] = [];

    while(indexesList.length < 6) {
      const index: number = Math.floor(Math.random() * this.bandsList.length);
      if (indexesList.indexOf(index) === -1) indexesList.push(index);
    }

    return indexesList;
  }

  shuffle(array: any[]): any[] {
    let currentIndex: number = array.length;
    let randomIndex: number;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  openBudgetDialog(band: any): void{
    this.dialog.open(HomeDialogComponent, { data: band });
  }

  goToBandProfile(bandId: number): void {
    this.router.navigate([`/profile/band/${bandId}`]);
  }
}
