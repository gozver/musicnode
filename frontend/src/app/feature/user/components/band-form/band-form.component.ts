import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-band-form',
  templateUrl: './band-form.component.html',
  styleUrls: ['./band-form.component.scss']
})
export class BandFormComponent implements OnInit {
  @Input() bandForm: FormGroup;
  @Input() BandFormError: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  checkSignUpError(): string {
    if (this.BandFormError)
      return 'border-red';
    
    return 'border-gray'
  }
}
