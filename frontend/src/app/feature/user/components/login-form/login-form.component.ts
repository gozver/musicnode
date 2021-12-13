import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Input() loginForm: FormGroup;
  @Input() loginError: boolean;

  hide: boolean;
  
  ngOnInit() {
    this.hide = true;
  }

  /**
   * @description Hide or show user password
   */
  tooglePassword(): void {
    this.hide = !this.hide;
  }

  checkLoginError() {
    if (this.loginError)
      return 'border-red';
    else 
      return 'border-gray'
  }
}
