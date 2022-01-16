import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { User } from '@app/shared/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileId: number;
  profileUser: User;
  
  userForm: FormGroup
  currentUser: User;
  imageData: string;

  avatarSelected: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly userService: UserService
    ) {
    this.profileId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(currentUser => this.currentUser = currentUser);

    this.userService.getUser(this.profileId).subscribe(
      profileUser => { 
        this.profileUser = profileUser;
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
      avatar: new FormControl(profileUser.avatar),
    });
  }

  isMyProfile(): boolean {
    return this.currentUser.id === this.profileId
  }

  onFileSelected(event: Event): void {
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

  updateImage(): void {
    this.userService.updateAvatar(this.currentUser.id, this.userForm.value.avatar).subscribe(avatar => {
      this.imageData = avatar;
      this.currentUser.avatar = avatar;
      this.avatarSelected = false;
      
      this.authService.setCurrentUser(this.currentUser);
    });
  }
}
