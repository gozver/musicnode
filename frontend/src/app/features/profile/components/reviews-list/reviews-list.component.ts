import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsListComponent implements OnInit {
  @Input() data: Observable<any>;
  @Input() isAdmin: Observable<boolean>;
  @Output() delete = new EventEmitter<number>();

  reviewsList: any[] = [];

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.data.subscribe(reviewsList => {
      this.reviewsList = [...reviewsList];
      this.cd.markForCheck();
    });
  }

  deleteReview(id: number): void {
    this.delete.emit(id);
  }
}
