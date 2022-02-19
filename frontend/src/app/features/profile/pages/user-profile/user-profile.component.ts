import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { RoleService } from '@shared/services/role.service';
import { User } from '@app/shared/interfaces/user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileId: number;
  profileUser: User;
  
  userForm: FormGroup;
  currentUser: User;
  imageData: string;

  avatarSelected: boolean = false;

  rolesList: any[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly roleService: RoleService
    ) {
    this.profileId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.initComponentData();
  }

  initComponentData(): void {
    this.currentUser = this.authService.currentUser$.value;

    console.log('--> this.currentUser:');
    console.log(this.currentUser);

    this.userService.getUser(this.profileId).subscribe(
      user => {
        this.profileUser = user[0];

        console.log('--> this.profileUser:');
        console.log(this.profileUser);

        this.roleService.getRolesByUserId(this.profileId).subscribe(rolesList => {
          this.rolesList = rolesList;

          console.log('--> this.rolesList');
          console.log(this.rolesList);
        });

        this.imageData = this.profileUser.avatar;
        this.initUserForm(this.profileUser);
      }, 
      error => {
        console.error("--> the user doesn't exist");
        console.error('--> error:', error);

        this.router.navigate(['/home']);
      }
    );
  }

  initUserForm(profileUser: User): void {
    this.userForm = new FormGroup({
      name:   new FormControl(profileUser.name),
      avatar: new FormControl(profileUser.avatar)
    });
  }

  isMyProfile(): boolean {
    return this.currentUser.id === this.profileId;
  }

  onAvatarSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    
    this.avatarSelected = true;
    this.userForm.patchValue({ avatar: file });

    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      
      reader.onload = () => {
        this.imageData = reader.result as string;
      }

      reader.readAsDataURL(file);
    }
  }

  updateAvatar(): void {
    this.userService.updateAvatar(this.currentUser.id, this.userForm.value.avatar).subscribe(avatar => {
      this.imageData = avatar;
      this.currentUser.avatar = avatar;
      this.avatarSelected = false;
      
      this.authService.setCurrentUser(this.currentUser);
    });
  }

  sendMessage(id: number): void {
    this.router.navigate(['/chat'], { queryParams: { id } });
  }

  isAdmin(): boolean {
    return this.currentUser.activeRole === 4;
  }

  goToEditProfile() {
    this.router.navigate([`/profile/user/${this.profileId}/edit`]);
  }
}
