import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-ad-form',
  templateUrl: './edit-ad-form.component.html',
  styleUrls: ['./edit-ad-form.component.scss']
})
export class EditAdFormComponent {
  @Input() adForm: FormGroup;
}
