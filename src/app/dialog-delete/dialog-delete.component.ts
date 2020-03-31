import { Component, Inject } from '@angular/core';
import { angularComponent } from '../../config/constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  styleUrls: angularComponent.styleUrls.dialogDelete,
  templateUrl: angularComponent.templateUrl.dialogDelete,
})
export class DialogDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>, // To make this dialog dialog
    @Inject(MAT_DIALOG_DATA) public data: { isDelete: boolean } // To take data from where this dialog called
  ) {}

  // Close the dialog
  cancel(): void {
    this.dialogRef.close();
  }
}