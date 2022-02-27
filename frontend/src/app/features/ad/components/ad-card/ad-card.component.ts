import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { AuthService } from '@shared/services/auth.service';
import { RoleService } from '@shared/services/role.service';
import { User } from '@shared/interfaces/user.interface'

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss']
})
export class AdCardComponent {
  @Input() ad: any;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  imagesList$ = new BehaviorSubject([]);

  currentUser: User;
  isMyAd: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser$.value;
    this.isMyAd = this.currentUser.id === parseInt(this.ad.user.id);

    this.roleService.getRolesByUserId(this.currentUser.id).subscribe(rolesList => {
      this.isAdmin = rolesList.filter(item => item.roleId === 4).length > 0;
    });

    this.imagesList$.next(this.ad.images);
  }

  sendMessage(id: number): void {
    this.router.navigate(['/chat'], { queryParams: { id: id } });
  }

  editAd(id: number): void {
    this.edit.emit(id);
  }

  deleteAd(id: number): void {
    this.delete.emit(id);
  }
}
