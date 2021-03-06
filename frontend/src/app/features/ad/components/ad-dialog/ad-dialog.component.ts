import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ad-dialog',
  templateUrl: './ad-dialog.component.html',
  styleUrls: ['./ad-dialog.component.scss']
})
export class AdDialogComponent {
  files: FileList = null;

  constructor(
    // Inject MAT_DIALOG_DATA to be able to receive data from the AdComponent
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  uploadImages(event: any): void {
    this.files = event.target.files;
    this.data.adForm.value.images = this.files;
  }
}
