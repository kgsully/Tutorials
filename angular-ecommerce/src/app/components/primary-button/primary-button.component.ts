import { Component, inject, input, output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.css'
})
export class PrimaryButtonComponent {

  label = input<string>('');  // the <string> specifier is not required, but can be helpful if the type isn't initially known

  btnClicked = output();

  // This event handler function is not strictly required, this.btnClicked.emit() could be used directly within the HTML (click)="this.btnClicked.emit()"
  handleButtonClick() {
    this.btnClicked.emit(); // this emits the event via the output method as defined earlier
  }
}
