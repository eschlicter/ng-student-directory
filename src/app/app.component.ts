import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { StudentService } from './students/students.service';
import { Student, FilterState, Filter, Option } from './types';
import { AddStudentComponent } from '../app/students/add-student/add-student.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  students: Observable<Student[]>;
  filterState: FilterState;
  filters: Observable<Filter[]>;

  constructor(studentService: StudentService, 
            private dialog: MatDialog) {
    this.students = studentService.students;
    this.filterState = studentService.filterState;
    this.filters = studentService.filters;
  }

  changeFilter(category: string, option: Option) {
    this.filterState[category] = option;
  }

  addStudent() {
    this.dialog.open(AddStudentComponent, {
      width: '500px',
      ariaLabel: 'Add a Student'
    });
  }
}