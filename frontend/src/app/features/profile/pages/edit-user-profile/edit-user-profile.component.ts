import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { User } from '@app/shared/interfaces/user.interface';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {
  profileId: number;
  profileUser: User;

  updateForm: FormGroup;
  currentUser: User;

  constructor(
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    this.profileId = parseInt(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    this.initComponentData();
  }

  initComponentData(): void {
    this.currentUser = this.authService.currentUser$.value;

    if (this.currentUser.activeRole !== 4 && this.profileId !== this.currentUser.id) {
      // this.router.navigate(['/home']);
      console.log('--> fail...')
    }

    this.userService.getUser(this.profileId).subscribe(user => {
      this.profileUser = user[0];
      this.initUserForm();
    });
  }

  initUserForm(): void {
    const phoneRegex = '^[0-9\-]+$';
    const passwdRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    
    this.updateForm = this.fb.group({
      id:       [ this.profileUser.id ],
      name:     [ this.profileUser.name,    [ Validators.required, Validators.minLength(3) ]],
      surname:  [ this.profileUser.surname, [ Validators.required, Validators.minLength(3) ]],
      phone:    [ this.profileUser.phone,   [ Validators.required, Validators.pattern(phoneRegex) ]],
      password: [ '' ,                      [ Validators.required, Validators.pattern(passwdRegex) ]],
      newPwd:   [ '' ,                      [ Validators.required, Validators.pattern(passwdRegex) ]],
    });
  }

  passwordsAreEqual(): boolean {
    return this.updateForm.value.password === this.updateForm.value.newPwd;
  }

  update(): void {
    this.userService.updateInfo(this.updateForm.value).subscribe(() => {
      this.router.navigate([`/profile/user/${this.profileId}`]);
    })
  }

  goBack() {
    this.location.back();
  }
}
