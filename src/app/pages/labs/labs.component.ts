import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {

  greeting = 'Hello World!';
  tasks = [
    'Install Angular CLI',
    'Create new app',
    'Serve app',
    'Create new component'
  ];

  name = 'Cristian';
  age = 27;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = {
    name: 'Cristian',
    age: 27,
    img: 'https://w3schools.com/howto/img_avatar.png'
  };

  clickHandler() {
    alert('Hello World!');
  }

  changeHandler(event: Event) {
    console.log(event);
  }
}
