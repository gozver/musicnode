// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    
    this.initContactForm();
  }

  initContactForm(): void {
    this.contactForm = this.fb.group({
      fullName: [ '', [ Validators.required ]],
      email:    [ '', [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ]],
      phone:    [ '', [ Validators.required, Validators.pattern('^[0-9]*$') ]],
      message:  [ '', [ Validators.required ]],
    });
  }
  
  sendMessage(): void {
    console.log(this.contactForm.touched)

    if (this.contactForm.controls.email.value === '') {
      
    }
  }
}
