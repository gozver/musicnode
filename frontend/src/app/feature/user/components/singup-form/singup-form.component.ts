import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-singup-form',
  templateUrl: './singup-form.component.html',
  styleUrls: ['./singup-form.component.scss']
})
export class SingupFormComponent {
  @Input() signupForm: FormGroup;
}
