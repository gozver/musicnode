import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  // viewchild => property decorator that configures a view query
  // we use it to reference the MatSidenav element in the template
  // ! => tells typescript the sidenav variable will be initialized later (strinct mode)
  @ViewChild(MatSidenav) sidenav!: MatSidenav; 
  
  constructor(
    private bpObserver: BreakpointObserver
  ) { }

  // view queries are set before the ngafterviewinit callback is called
  ngAfterViewInit() {
    // if max-width <= 800px it means we are in a small screen
    this.bpObserver.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {  // width <= 800px
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {            // width > 800px
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
}
