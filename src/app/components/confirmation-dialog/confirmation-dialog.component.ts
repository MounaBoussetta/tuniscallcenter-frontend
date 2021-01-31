import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent implements OnInit {
  person: any = {};

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
     @Inject(MAT_DIALOG_DATA) data: any) {
       this.person =  data
     }

  ngOnInit() {}

  delete() {
    this.dialogRef.close(this.person.id);
  }

close() {
    this.dialogRef.close();
}
}
