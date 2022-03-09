import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EmailService } from '@shared/services/email.service';
import { EmailDialogComponent } from '@shared/components/email-dialog/email-dialog.component';


@Component({
  selector: 'app-home-dialog',
  templateUrl: './home-dialog.component.html',
  styleUrls: ['./home-dialog.component.scss']
})
export class HomeDialogComponent implements OnInit {
  contactForm: FormGroup;
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly emailService: EmailService,
    @Inject(MAT_DIALOG_DATA) public band: any
  ) { }

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm(): void {
    const phoneRegex = '^[0-9\-]+$';
    const eRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

    this.contactForm = this.fb.group({
      name:    [ '', [ Validators.required, Validators.minLength(3) ]],
      email:   [ '', [ Validators.required, Validators.pattern(eRegex) ]],
      phone:   [ '', [ Validators.required, Validators.pattern(phoneRegex) ]],
      message: [ '', [ Validators.required, Validators.minLength(3) ]],
      band:    [ '' ]
    });
  }
  
  sendBudget(): void {
    this.contactForm.controls['band'].setValue(this.band);
    this.emailService.sendEmail(this.contactForm.value).subscribe(
      res => {
        this.dialog.open(
          EmailDialogComponent, { 
          data: { 
            title: 'Email Success',
            code: null,
            message: `
              Your email has been sent successfully.
              ${this.band.name} will get back in touch with you soon.
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

        console.error(`--> error code: ${err.error.err.code}`);
        console.error(`--> error message: ${err.error.err.message}`);
        console.error('--> error objet:', err);
      });
    this.contactForm.reset();
  }
}
