import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss']
})
export class EmailDialogComponent {
  constructor(
    // Inject MAT_DIALOG_DATA to be able to receive data from the AdComponent
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
