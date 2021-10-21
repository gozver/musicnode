import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Ad } from '@shared/interfaces/ad.interface';

@Component({
  selector: 'app-ad-create',
  templateUrl: './ad-create.component.html',
  styleUrls: ['./ad-create.component.scss']
})
export class AdCreateComponent implements OnInit {
  @Output() newAd = new EventEmitter<Ad>();

  adForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initAdForm();
  }

  initAdForm(): void {
    this.adForm = this.fb.group({
      title:        [ '', Validators.required ],
      description:  [ '', Validators.required ],
    });
  }

  createAd(): void {
    this.newAd.emit(this.adForm.value);
    this.adForm.reset();    
  }
}
