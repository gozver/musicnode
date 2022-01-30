import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent {
  constructor(
    // Inject MAT_DIALOG_DATA to be able to receive data from the AdComponent
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
