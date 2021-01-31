import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Person } from '../models/person';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(baseUrl + "/persons");
  }
}
