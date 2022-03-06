import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comp-form',
  templateUrl: './comp-form.component.html',
  styleUrls: ['./comp-form.component.scss']
})
export class CompFormComponent {
  @Input() companyForm: FormGroup;
}
