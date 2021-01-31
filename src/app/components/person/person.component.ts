import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {

  currentPerson: Person = {};
  formFildes!: FormGroup;
  formFildesOrigin!: FormGroup;
  formErrors: any;
  loading: boolean = false;
  view: boolean = false;

  @Input()
  set person(person: Person) {
    this.currentPerson = person;
  }

  @Output() editPerson = new EventEmitter<any>();
  @Output() deletePerson = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.formFildes = this.formBuilder.group({
      firstName: [this.currentPerson.firstName, [Validators.required]],
      lastName: [this.currentPerson.lastName, [Validators.required]],
      emailAddress: [this.currentPerson.emailAddress, [Validators.required, Validators.email]]
    });
    this.formFildesOrigin = this.formFildes.value;


    this.formFildes.valueChanges.subscribe(() => {
      this.formErrors = this.createFormError(this.formFildes);
      this.view = this.compare(this.formFildes.value, this.formFildesOrigin) && this.formFildes.valid;
    });
  }

  edit() {
    this.formFildes.value.id = this.currentPerson.id;
    this.loading = true;
    this.editPerson.emit(this.formFildes.value);
  }

  delete(){
    this.deletePerson.emit(this.currentPerson.id);
  }

  compare(obj1: any, obj2: any) {
    let change = false;
    for (const key in obj1) {
      if (obj1[key] !== obj2[key]) {
          change = true;
        break;
      }
    }
    return change;
  }

  createFormError(formControl) {

    const formControlError = {};

    for (const field in formControl.controls) {

      if (!formControl.controls.hasOwnProperty(field)) {
        continue;
      }

      // Create an error object
      formControlError[field] = {};

      // Get the control
      const control = formControl.get(field);
      if (control && control['controls'] && control['controls'].length > 0) {
        formControlError[field] = createFormError(control);
      } else if (control && control.dirty && !control.valid) {
        formControlError[field] = control.errors;
      }
    }
    return formControlError;
  }
}
