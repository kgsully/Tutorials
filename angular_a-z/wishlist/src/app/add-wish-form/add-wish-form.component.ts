import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WishItem } from '../../shared/models/wishItem';

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
