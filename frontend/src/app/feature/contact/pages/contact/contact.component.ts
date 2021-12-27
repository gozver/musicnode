// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services and Interfaces
import { AuthService } from '@shared/services/auth.service';
import { EmailService } from '@app/shared/services/email.service';
import { User } from '@app/shared/interfaces/user.interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  currentUser: User;
  contactForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe(isLogged => {
      this.isAuthenticated = isLogged;
      
      if (this.isAuthenticated) {
        this.authService.currentUser$.subscribe(currentUser => {
          this.currentUser = currentUser;
        });
      }
    });

    this.initContactForm();
  }

  ngOnDestroy(): void {
    this.contactForm.reset();
  }

  initContactForm(): void {
    let name  = this.isAuthenticated ? `${this.currentUser.name} ${this.currentUser.surname}` : '';
    let email = this.isAuthenticated ? this.currentUser.email : '';
    let phone = this.isAuthenticated ? this.currentUser.phone : '';
    
    this.contactForm = this.fb.group({
      name:    [ name,  [ Validators.required ]],
      email:   [ email, [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ]],
      phone:   [ phone, [ Validators.required, Validators.pattern('^[0-9]*$') ]],
      message: [ '',    [ Validators.required ]],
    });
  }
  
  sendMessage(): void {
    this.emailService.sendEmail(this.contactForm.value).subscribe(
      res => {
        this.contactForm.reset();

        console.log('--> send email response:');
        console.log(res);
      },
      err => console.log(err)
    );
  }
}
