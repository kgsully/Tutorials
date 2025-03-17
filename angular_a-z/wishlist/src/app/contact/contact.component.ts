import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms'; // Using ReactiveFormsModules instead of FormsModule

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  // This may appear similar at first glance to the template-driven approach in creating a property on input fields and assigning them to
  // variables in the class, however using the FormControl object gives us an API that we can tap into to make the forms much more flexible -
  // Examples:
    // If the .dirty property is true, then the value in the form field has changed from its original value, which is very helpful to know as the form is processed
    //    this.senderNameControl.dirty
    // There is also a .pristine property, which is the opposite- that a form field has NOT changed from its original value. Also, fields can programatically be marked as pristine.
    //    this.senderEmailControl.pristine
    //    this.senderEmailControl.markAsPristine
    // Touched is another property that indicates whether the user has given focus to the form field and then took focus away
    //    this.senderMessageControl.touched
    // Perhaps the most useful will be the ability to use very expressive and flexible validators


  // The first argument sets the inital value. Setting it here to an empty string
  senderNameControl = new FormControl('');
  senderEmailControl = new FormControl('');
  senderMessageControl = new FormControl('');

  submitForm() {
    if(this.senderNameControl.dirty) {
      alert('You changed the name field');
    }
  }
}
