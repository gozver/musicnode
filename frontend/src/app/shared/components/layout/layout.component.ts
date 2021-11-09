// angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'

// angular material
import { MatSidenav } from '@angular/material/sidenav';

// custom services
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  // viewchild => we use viewchild to reference the MatSidenav element in the template
  // ! => tells typescript the sidenav variable will be initialized later (strinct mode)
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  isAuthenticated: boolean = false;
  
  constructor(
    private readonly authService: AuthService,
    private readonly bpObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLogged) => {
      this.isAuthenticated = isLogged;
    });
  }

  closeIfIsMobileView(): void {
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }

  logout(): void {
    this.authService.logout();
    this.sidenav.close();
  }

  ngAfterViewInit() {
    // max-width: 800px => small screens
    this.bpObserver.observe(['(max-width: 800px)']).subscribe((res) => {
      // angular lifecicle hook: https://www.youtube.com/watch?v=O47uUnJjbJc&t=9s    
      Promise.resolve().then(() => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    });
  }
}
