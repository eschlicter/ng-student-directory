import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterState, Filter, Option, Student } from '../types';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { tap, map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: Observable<Student[]>;
  filterState: FilterState = {};
  filters: Observable<Filter[]>;

  constructor(http: HttpClient) {
    this.students = http.get<Student[]>('assets/students.json').pipe(
      share()
    );
    this.filters = this.students.pipe(
      map(students => this.createFilters(students))
    );
  }

  private createFilters( students: Student[]) {
    return [{
      category: 'birthdate',
      displayName: 'Birthday',
      options: this.extractFilterOptions('birthdate', students)
    }, {
      category: 'undergraduateMajor',
      displayName: 'Undergraduate major',
      options: this.extractFilterOptions('undergraduateMajor', students)
    }];
  }

  private extractFilterOptions(category: string, students: Student[]): Option[] {
    this.filterState[category] = '';
    return _.chain(students)
      .groupBy(category)
      .keys()
      .sort()
      .value();
  }
}
