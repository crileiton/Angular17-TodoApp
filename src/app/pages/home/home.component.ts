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
      completed: true
    },
    {
      id: Date.now(),
      title: 'Style app',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Finish app',
      completed: true
    }
  ]);

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });

  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const title = this.newTaskCtrl.value.trim();
      this.addTask(title);
      this.newTaskCtrl.reset();
    }
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }

  toggleChecked(index: number) {
    this.tasks.update((tasks) =>
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) =>
      tasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      }));
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((tasks) =>
      tasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      }));
  }
}