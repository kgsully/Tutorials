import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WishItem } from '../../../shared/models/wishItem';

// This is an implementation of the template driven form approach (2 way binding on form field with ngModel, etc)
// They are generally good for small forms, but in Angular, for larger forms, Reactive forms make more sense (espeically if the application is 'forms heavy')
// This is for a number of reasons -
//    1. There is a performance hit using the template-driven approach (overhead to manage things happening behind the scenes)
//    2. Can't be guaranteed that the data that we are working with is actually the data we want to work with
//       (due to the async and 2 way binding nature of using ngModel, the data we are working with inside of the component might not necessarily be what we need to work with)

@Component({
  selector: 'app-add-wish-form',
  imports: [FormsModule],
  templateUrl: './add-wish-form.component.html',
  styleUrl: './add-wish-form.component.css'
})
export class AddWishFormComponent {

  // Could perform the output event emitter in a couple of different ways. Can either pass the value of the text in the text input box, or
  // could pass a new WishItem object. This is defined by the type specificed in the angle brackets <>.
  @Output() addWish = new EventEmitter<WishItem>()

  newWishText: string = '';

  addNewWish() {
    // Line for adding the new WishItem to the array replaced with an event emitter
    // this.items.push(new WishItem(this.newWishText))  // defaults to false based upon the wishItem model definition
    this.addWish.emit(new WishItem(this.newWishText));
    this.newWishText = ''; // clear the text in the box, clearing it here will clear it in the box due to 2 way binding
  }

}
