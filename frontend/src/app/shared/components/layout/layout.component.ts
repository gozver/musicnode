import { Component, ViewChild, OnInit, AfterViewInit, AfterViewChecked, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { MatSidenav } from '@angular/material/sidenav';

import { AuthService } from '@shared/services/auth.service';
import { User } from '@app/shared/interfaces/user.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  // ! => tells typescript a variable will be initialized later (only in strinct mode)
  // viewchild => we use viewchild to reference the MatSidenav element in the template
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  isLogged: boolean = false;
  currentUser: User;

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly router: Router,
    private readonly bpObserver: BreakpointObserver,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getComponentData();
  }

  ngAfterViewInit(): void {
    this.setBreakPointObserver();
  }

  // This component will auto update when a behavior subject changes in other components
  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.authService.isLogged$.complete();
    this.authService.currentUser$.complete();
  }

  // General functions
  getComponentData(): void {
    this.authService.isLogged$.subscribe(isLogged => this.isLogged = isLogged);
    this.authService.currentUser$.subscribe(currentUser => this.currentUser = currentUser);
  }

  hasRole(): boolean {
    return this.currentUser.hasRole;
  }

  // BreakpointObserver on small screens => max-width: 800px
  // Angular lifecicle hook: https://www.youtube.com/watch?v=O47uUnJjbJc&t=9s
  setBreakPointObserver(): void {
    this.bpObserver.observe(['(max-width: 800px)']).subscribe((res) => {
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

  closeIfIsMobileView(): void {
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }

  logout(): void {
    this.authService.logout();
    this.closeIfIsMobileView();
  }

  // Redirect functions (so redirection occurs when clicking a button instead of clicking an <a> tag)
  navigateTo(component: string): void {
    this.router.navigate([`${component}`]);
    this.closeIfIsMobileView();
  }

  navigateByUrl(component: string): void {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate([`${component}/user/${this.currentUser.id}`]);
    });

    this.closeIfIsMobileView();
  }
}
