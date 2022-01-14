import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  
  userForm: FormGroup
  currentUser: User;
  imageData: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly userService: UserService
    ) {
    this.profileId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(currentUser => this.currentUser = currentUser)
    this.initSignupForm();

    this.imageData = this.currentUser.avatar;

    console.log('--> this.profileId:');
    console.log(this.profileId);
  }

  initSignupForm(): void {
    this.userForm = new FormGroup({
      name:   new FormControl(this.currentUser.name),
      avatar: new FormControl(this.currentUser.avatar),
    });
  }

  /**
   * setValue() to set a new value 
   * patchValue() to update the current value
   */
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
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
      console.log(`--> avatar: ${avatar}`);
      this.imageData = avatar;
    });
  }
}
