import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent {
  @Input() companyForm: FormGroup;
  @Input() companyFormError: boolean;

  checkSignUpError(): string {
    if (this.companyFormError)
      return 'border-red';
    
    return 'border-gray'
  }
}
