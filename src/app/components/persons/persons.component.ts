import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
})
export class PersonsComponent implements OnInit {
  persons: Person[] = [];
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  loading = false;

  constructor(
    private personService: PersonService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.personsList();
  }

  personsList(): void {
    this.personService.getAll().subscribe(
      (response) => {
        this.persons = response;
        console.log('persons', this.persons);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onEdit(obj: any) {
    this.loading = true;
    this.personService.update(obj.id, obj.person).subscribe(
      (response) => {
        console.log('update', response);
        this.personsList();
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }

  onDelete(obj: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: obj.id,
      name: obj.firstName + ' ' + obj.lastName,
    };


    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.personService.delete(data).subscribe(
          (response) => {
            console.log(response);
            this.personsList();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
}
