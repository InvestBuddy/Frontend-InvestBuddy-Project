import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: true, // this makes it a standalone component
  imports: [CommonModule, FormsModule], // Import necessary modules here
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  newStudent: any = { name: '', email: '',phoneNumber:'' };

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.fetchStudents();
    });
  }

  navigateToAddStudent() {
    this.router.navigate(['students/add']);
  }

  navigateToUpdateStudent(id: number) {
    this.router.navigate(['students/update/', id]);
  }
}
