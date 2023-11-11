import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from './../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Install Angular CLI',
      complete: true
    },
    {
      id: Date.now(),
      title: 'Style app',
      complete: false
    },
    {
      id: Date.now(),
      title: 'Finish app',
      complete: true
    }
  ]);

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^\S+(\s\S+)*$/)
    ]
  });

  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const title = this.newTaskCtrl.value;
      this.addTask(title.trim());
      this.newTaskCtrl.reset();
    }
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      complete: false
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }

  toggleChecked(index: number) {
    this.tasks.update((tasks) =>
      tasks.map((task, i) =>
        i === index ? { ...task, complete: !task.complete } : task
      )
    );
  }
}