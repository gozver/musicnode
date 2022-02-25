import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AdService } from '@shared/services/ad.service';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.scss']
})
export class EditAdComponent implements OnInit {
  paramId: number;
  subscription: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly adService: AdService
  ) { }

  ngOnInit(): void {
    this.getComponentData();
  }

  getComponentData(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.paramId = +params['id'] || null;

      console.log('--> this.paramId:', this.paramId);
      
      if (this.paramId) {
        this.adService.getAd(this.paramId).subscribe(ad => {
          console.log('--> ad:', ad);
        });
      }
    });
  }
}
