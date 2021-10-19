import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  // viewchild => we use viewchild to reference the MatSidenav element in the template
  // ! => tells typescript the sidenav variable will be initialized later (strinct mode)
  @ViewChild(MatSidenav) sidenav!: MatSidenav; 
  
  constructor(
    private bpObserver: BreakpointObserver
  ) { }

  ngAfterViewInit() {
    // angular lifecicle hook: https://www.youtube.com/watch?v=O47uUnJjbJc&t=9s
    setTimeout(() => {
      this.bpObserver.observe(['(max-width: 800px)']).subscribe((res) => {
        // if max-width <= 800px it means we are in a small screen
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    }, 0);
  }
}
