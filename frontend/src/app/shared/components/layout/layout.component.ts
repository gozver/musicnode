import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout'
import { FocusMonitor } from '@angular/cdk/a11y';

import { MatSidenav } from '@angular/material/sidenav';

import { AuthService } from '@shared/services/auth.service';
import { User } from '@app/shared/interfaces/user.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  // ! => tells typescript a variable will be initialized later (only in strinct mode)
  // viewchild => we use viewchild to reference the MatSidenav element in the template
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  isLogged: boolean = false;
  hasRole: boolean = false;
  currentUser: User;

  constructor(
    private cdRef: ChangeDetectorRef,
    private readonly router: Router,
    private readonly bpObserver: BreakpointObserver,
    private readonly focusMonitor: FocusMonitor,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getComponentData();
  }

  ngAfterViewInit() {
    this.setBreakPointObserver();
    this.disableFirstActiveButton();
  }

  // So this component can detects changes in other components
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  getComponentData(): void {
    this.authService.isLogged$.subscribe(isLogged => this.isLogged = isLogged);
    this.authService.hasRole$.subscribe(hasRole => this.hasRole = hasRole);
    this.authService.currentUser$.subscribe(currentUser => this.currentUser = currentUser);
  }

  setBreakPointObserver(): void {
    // BreakpointObserver on small screens => max-width: 800px
    this.bpObserver.observe(['(max-width: 800px)']).subscribe((res) => {
      // Angular lifecicle hook: https://www.youtube.com/watch?v=O47uUnJjbJc&t=9s
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

  disableFirstActiveButton(): void {
    // Overwrite cdk-focused in Angular: 
    // https://stackoverflow.com/questions/48953972/how-to-disable-or-overwrite-cdk-focused-in-angular
    this.focusMonitor.stopMonitoring(document.getElementById('menu-button'));
  }

  closeIfIsMobileView(): void {
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }

  gotToProfileComponent(): void {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/profile/${this.currentUser.id}`]);
    });
  }

  logout(): void {
    this.authService.logout();
    this.closeIfIsMobileView();
  }

  // NOTE: BehaviorSubjects forkJoin
  // forkJoin([
  //   this.authService.isLogged$.pipe(take(1)),
  //   this.authService.hasRole$.pipe(take(1)),
  //   this.authService.currentUser$.pipe(take(1))
  // ]).subscribe(([ isLogged, hasRole, currentUser ]) => {
  //   this.isLogged = isLogged;
  //   this.hasRole = hasRole;
  //   this.currentUser = currentUser;
  // });
}
