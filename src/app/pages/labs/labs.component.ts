import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {

  greeting = 'Hello World!';
  tasks = signal([
    'Install Angular CLI',
    'Create new app',
    'Serve app',
    'Create new component'
  ]);

  name = signal('Cristian');
  age = 27;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = signal({
    name: 'Cristian',
    age: 7,
    img: 'https://w3schools.com/howto/img_avatar.png'
  });

  colorCtrl = new FormControl();
  widthCtrl = new FormControl({
    nonNullable: true
  });

  nameCtrl = new FormControl('cristian', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });


  constructor(){
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  clickHandler() {
    alert('Hello World!');
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newAge = input.value;
    this.person.update(
      prevState => {
        return {
          ...prevState,
          age: parseInt(newAge, 10)
        }
      }
    );
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newName = input.value;
    this.person.update(
      prevState => {
        return {
          ...prevState,
          name: newName
        }
      }
    );
  }
}
