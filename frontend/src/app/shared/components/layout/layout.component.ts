import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout'

import { MatSidenav } from '@angular/material/sidenav';

import { AuthService } from '@shared/services/auth.service';
import { UserService } from './../../services/user.service';
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
  currentUser: User;
  role: string;

  constructor(
    private cdRef: ChangeDetectorRef,
    private readonly router: Router,
    private readonly bpObserver: BreakpointObserver,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.getComponentData();
  }

  ngAfterViewInit() {
    this.setBreakPointObserver();
  }

  // So this component can detects changes in other components
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  getComponentData(): void {
    this.authService.isLogged$.subscribe(isLogged => this.isLogged = isLogged);    
    this.authService.currentUser$.subscribe(async currentUser => {
      this.currentUser = currentUser;

      // if (this.currentUser) {
      //   setTimeout(() => {
      //     this.userService.getUser(this.currentUser.id).subscribe(user => {
      //       const roleId = user[0].roles[0].code;

      //       console.log('--> user:');
      //       console.log(user);

      //       if (roleId !== 2 || roleId !== 3) {
      //         this.role = user[0].roles[0].name;
      //       } else {
      //         this.role = user[0].roles[0].name;
      //       }

      //       console.log(`--> role: ${this.role}`);
      //     })
      //   }, 0);
      // }
    });
  }

  hasRole(): boolean {
    return this.currentUser.hasRole;
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

  closeIfIsMobileView(): void {
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }

  logout(): void {
    this.authService.logout();
    this.closeIfIsMobileView();
  }

  // Redirect functions (so the app redirects when clicking a button and not when when clicking an <a> tag)
  navigateTo(component: string): void {
    this.router.navigate([`${component}`]);
    this.closeIfIsMobileView();
  }

  navigateByUrl(component: string): void {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${component}/${this.currentUser.id}`]);
    });

    this.closeIfIsMobileView();
  }
}
