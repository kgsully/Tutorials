import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  label = input<string>('');  // the <string> specifier is not required, but can be helpful if the type isn't initially known

  btnClicked = output();

  // This event handler function is not strictly required, this.btnClicked.emit() could be used directly within the HTML (click)="this.btnClicked.emit()"
  handleButtonClick() {
    this.btnClicked.emit(); // this emits the event via the output method as defined earlier
  }
}
