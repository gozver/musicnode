// Angular
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { AuthService } from '@app/shared/services/auth.service';

// Interfaces
import { Ad } from '@shared/interfaces/ad.interface';

@Component({
  selector: 'app-ad-create',
  templateUrl: './ad-create.component.html',
  styleUrls: ['./ad-create.component.scss']
})
export class AdCreateComponent implements OnInit {
  @Output() newAd = new EventEmitter<Ad>();

  adForm: FormGroup;
  userId: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initAdForm();
    this.userId = this.authService.userId$.value;
  }

  initAdForm(): void {
    this.adForm = this.fb.group({
      title:        [ '', Validators.required ],
      description:  [ '', Validators.required ],
    });
  }

  createAd(): void {
    // this.newAd.emit({ 
    //   userId: this.userId,
    //   title: this.adForm.value.title,
    //   description: this.adForm.value.description,
    // });
    // this.adForm.reset();
  }
}