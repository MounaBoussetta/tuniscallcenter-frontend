import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  persons: Person[] = [];
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getAll().subscribe(
      response => {
        this.persons = response
        console.log('persons', this.persons);
      })

  }

  onEdit(obj: any){
    console.log('obj', obj);
  }

  onDelete(obj: any){
    console.log('obj', obj);
  }

}
