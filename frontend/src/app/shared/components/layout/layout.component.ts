// Angular
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'
import { FocusMonitor } from '@angular/cdk/a11y';

// Angular Material
import { MatSidenav } from '@angular/material/sidenav';

// RxJS
import { Observable } from 'rxjs';

// Services and Models
import { AuthService } from '@shared/services/auth.service';
import { UserRoleService } from '@app/shared/services/user-role.service';
import { User } from '@app/shared/interfaces/user.interface';
import { UserRole } from '@app/shared/interfaces/user-role.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  // ! => tells typescript the sidenav variable will be initialized later (strinct mode)
  // viewchild => we use viewchild to reference the MatSidenav element in the template
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  isLogged: boolean = false;
  currentUser: User;
  userRoles: UserRole[];

  data: Observable<any[]>[] = [];

  constructor(
    private readonly bpObserver: BreakpointObserver,
    private readonly focusMonitor: FocusMonitor,
    private readonly authService: AuthService,
    private readonly userRoleService: UserRoleService, 
  ) { }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe(isLogged => this.isLogged = isLogged);
    this.authService.currentUser$.subscribe(currentUser => {
      this.currentUser = currentUser;

      if (this.currentUser.hasRole) {
        this.userRoleService.findByUserId(this.currentUser.id).subscribe(userRoles=> {
          this.userRoles = userRoles;
          
          console.log('--> userRoles:');
          console.log(this.userRoles);
        }); 
      }
    });

    console.log(`--> currentUser.id: ${this.currentUser.id}`);
    console.log(`--> currentUser.hasRole: ${this.currentUser.hasRole}`);
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

  ngAfterViewInit() {
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

    // Overwrite cdk-focused in Angular: 
    // https://stackoverflow.com/questions/48953972/how-to-disable-or-overwrite-cdk-focused-in-angular
    this.focusMonitor.stopMonitoring(document.getElementById('menu-button'));
  }
}
