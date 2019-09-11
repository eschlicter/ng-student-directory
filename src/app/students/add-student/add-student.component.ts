import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { StudentService } from '../students.service';
import { Observable } from 'rxjs';
import { Option } from '../../types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  student: FormGroup;
  undergraduateMajors: Observable<Option[]>;

  constructor(
    private dialogRef: MatDialogRef<AddStudentComponent>,
    fb: FormBuilder,
    studentService: StudentService
  ) {
    this.student = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleInitial: ['', Validators.maxLength(1)],
      active: [true],
      birthdate: ['', Validators.required],
      undergraduateMajor: ['', Validators.required]
    });
    this.undergraduateMajors = studentService.filters.pipe(
      map(filters => filters.find(f => f.category === 'undergraduateMajor')),
      map(filter => filter.options),
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  saveStudent() {
    // Save to backend
    // Display new astronaut
    console.log(this.student.value);
    this.close();
  }

}
