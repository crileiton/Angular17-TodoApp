import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from './../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const title = input.value;
    this.addTask(title);
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