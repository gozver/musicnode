import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-band-form',
  templateUrl: './band-form.component.html',
  styleUrls: ['./band-form.component.scss']
})
export class BandFormComponent {
  @Input() bandForm: FormGroup;
  @Input() bandFormError: boolean;

  checkSignUpError(): string {
    if (this.bandFormError)
      return 'border-red';
    
    return 'border-gray'
  }
}
