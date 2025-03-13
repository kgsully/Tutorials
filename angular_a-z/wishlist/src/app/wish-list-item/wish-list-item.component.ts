import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WishItem } from '../../shared/models/wishItem';
import events from './../../shared/services/EventService';

@Component({
  selector: 'app-wish-list-item',
  imports: [CommonModule],
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.css'
})
export class WishListItemComponent {
  // Original implementation only works with the individual parts of the wish (text and isComplete). This way could work if there were a unique identifier
  // for each wish (to be able to find it to remove it), which in a real application we'd likely have as this data would come from a datastore and would have an id that is unique
  // to be used as the identifier to remove it. However, for the purposes of this demonstration, going to pass the entire wish object (reference) so that it can be removed from the array
  //    Original implementation used the following - @Input() wishText!: string;
  @Input() wish!: WishItem; // Note the ! after wishText is an assertion that it will not be null, which allows it to be declared without initialization. OK in this instance as it will be supplied by the parent

  // REMOVED DUE TO REFACTOR TO CHANGE THE INPUT TO WishItem OBJECT INSTEAD OF THE INDIVIDUAL FIELDS OF THE OBJECT
  // Note the naming convention for the variable of @Output - for 2 way bindings, in order for angular to recognize the link between the input and output,
  // need to name the output the same name as the input, but followed by `Change`.
  // @Input() fulfilled!: boolean;
  // @Output() fulfilledChange = new EventEmitter<boolean>();

  removeWish() {
    events.emit('removeWish', this.wish);
  }

  toggleFulfilled() {
    // REMOVED DUE TO REFACTOR TO CHANGE THE INPUT TO WishItem OBJECT INSTEAD OF THE INDIVIDUAL FIELDS OF THE OBJECT
    // Don't need to find the item in the item array because it is passed by reference
    // this.fulfilled = !this.fulfilled;
    // this.fulfilledChange.emit(this.fulfilled);
    this.wish.isComplete = !this.wish.isComplete;
  }

}
