import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../interfaces/course.interface';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent {
  @Input() course!: Course;
  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<number>();

  durationLabel(duration: number): string {
    const minutes = duration ?? 0;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours && mins) return `${hours} ч ${mins} мин`;
    if (hours) return `${hours} ч`;
    return `${mins} мин`;
  }

  formatDateRu(date: Date): string {
    if (!date) return '';
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }

  onEditClick(): void {
    this.editCourse.emit(this.course);
  }

  onDeleteClick(): void {
    this.deleteCourse.emit(this.course.id);
  }
}
