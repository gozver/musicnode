import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { RoleService } from '@shared/services/role.service';
import { User } from '@shared/interfaces/user.interface';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {
  profileId: number;
  profileUser: User;
  currentUser: User;

  userForm: FormGroup;

  isAdmin: boolean = false;
  rolesList: any[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly location: Location,
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

    this.roleService.getRolesByUserId(this.currentUser.id).subscribe(rolesList => {
      this.isAdmin = rolesList.filter(item => item.roleId === 4).length > 0;

      this.userService.getUser(this.profileId).subscribe(
        user => {
          this.profileUser = user[0];
          this.initUserForm();

          if (!this.isAdmin && this.currentUser.id !== this.profileId) {
            console.error('--> unauthorized');
            console.error('--> redirect to home');
            this.router.navigate(['/home']);
          }
        }, 
        error => {
          console.error('--> error:');
          console.error(error);
          
          this.router.navigate(['/home']);
        }
      );
    });
  }

  initUserForm(): void {
    const phoneRegex = '^[0-9\-]+$';
    const passwdRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    
    let id = this.profileUser.id
    let name = this.profileUser.name
    let surname = this.profileUser.surname
    let phone = this.profileUser.phone    

    this.userForm = this.fb.group({
      id:       [ id ],
      name:     [ name,    [ Validators.required, Validators.minLength(3) ]],
      surname:  [ surname, [ Validators.required, Validators.minLength(3) ]],
      phone:    [ phone,   [ Validators.required, Validators.pattern(phoneRegex) ]],
      password: [ '' ,     [ Validators.required, Validators.pattern(passwdRegex) ]],
      newPwd:   [ '' ,     [ Validators.required, Validators.pattern(passwdRegex) ]],
    });
  }

  passwordsAreEqual(): boolean {
    return this.userForm.value.password !== '' && this.userForm.value.password === this.userForm.value.newPwd; 
  }

  update(): void {
    this.userService.updateInfo(this.userForm.value).subscribe(() => {
      this.router.navigate([`/profile/user/${this.profileId}`]);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
