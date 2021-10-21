import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Ad } from '@shared/interfaces/ad.interface';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss']
})
export class AdListComponent implements OnInit {
  @Output() create: EventEmitter<Ad> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {    
  }

  createAd(newAd: any): void {
    console.log(newAd);    
  }
}
