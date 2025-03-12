import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WishItem } from '../../shared/models/wishItem';


@Component({
  selector: 'app-wish-list-item',
  imports: [CommonModule],
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.css'
})
export class WishListItemComponent {

  @Input() wishText!: string; // Note the ! after wishText is an assertion that it will not be null, which allows it to be declared without initialization. OK in this instance as it will be supplied by the parent

  // Note the naming convention for the variable of @Output - for 2 way bindings, in order for angular to recognize the link between the input and output,
  // need to name the output the same name as the input, but followed by `Change`.
  @Input() fullfilled!: boolean;
  @Output() fullfilledChange = new EventEmitter<boolean>();

  toggleFullfilled() {
    // Don't need to find the item in the item array because it is passed by reference
    this.fullfilled = !this.fullfilled;
    this.fullfilledChange.emit(this.fullfilled);
  }

}
