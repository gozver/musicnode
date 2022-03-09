import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '@shared/services/auth.service';
import { EmailService } from '@shared/services/email.service';
import { User } from '@shared/interfaces/user.interface';

import { EmailDialogComponent } from '@shared/components/email-dialog/email-dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;
  currentUser: User;
  contactForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly emailService: EmailService
  ) { }

  ngOnInit(): void {
    this.initComponentData();
    this.initContactForm();
  }

  ngOnDestroy(): void {
    this.contactForm.reset();
  }

  initComponentData(): void {
    this.authService.isLogged$.subscribe(isLogged => {
      this.isLogged = isLogged;
      
      if (this.isLogged) {
        this.currentUser = this.authService.currentUser$.value;
      }
    });
  }
  
  initContactForm(): void {
    let name  = this.isLogged ? `${this.currentUser.name} ${this.currentUser.surname}` : '';
    let email = this.isLogged ? this.currentUser.email : '';
    let phone = this.isLogged ? this.currentUser.phone : '';
    
    const phoneRegex = '^[0-9\-]+$';
    const emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

    this.contactForm = this.fb.group({
      name:    [ name,  [ Validators.required, Validators.minLength(3) ]],
      email:   [ email, [ Validators.required, Validators.pattern(emailRegex) ]],
      phone:   [ phone, [ Validators.required, Validators.pattern(phoneRegex) ]],
      message: [ '',    [ Validators.required, Validators.minLength(3) ]],
    });
  }
  
  sendMessage(): void {
    this.emailService.sendEmail(this.contactForm.value).subscribe(
      res => {
        this.dialog.open(
          EmailDialogComponent, { 
          data: { 
            title: 'Email Success',
            code: null,
            message: `
              Your email has been sent successfully.
              One of our colleagues will get back in touch with you soon.
            `
          }
        });
      },
      err => {
        this.dialog.open(
          EmailDialogComponent, { 
          data: { 
            title: 'Email Error',
            code: err.error.err.code,
            message: err.error.err.message 
          }
        });

        console.error('--> error code:');
        console.error(err.error.err.code);
        console.error('--> error message:');
        console.error(err.error.err.message);
        console.error('--> error objet:');
        console.error(err);
      });
    this.contactForm.reset();
  }
}
