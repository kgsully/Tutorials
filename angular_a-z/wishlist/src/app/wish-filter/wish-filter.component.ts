import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WishItem } from '../../shared/models/wishItem';

const filters = [
  (item: WishItem) => item,
  (item: WishItem) => !item.isComplete,
  (item: WishItem) => item.isComplete
];

@Component({
  selector: 'app-wish-filter',
  imports: [FormsModule],
  templateUrl: './wish-filter.component.html',
  styleUrl: './wish-filter.component.css'
})
// Implement interface OnInit to allow for the use of the ngOnInit method that will fire when the component is initialized
export class WishFilterComponent implements OnInit{

  @Output() filter = new EventEmitter<any>();

  // since the filter variable within app-component initializes to an empty function (() => {}), no filtering will be applied until the value is set
  // ngOnInit will fire when the component is initialized and will emit a default value for the filter to app-component to pass to the wish-list component
  ngOnInit(): void {
    this.filter.emit(filters[0]);
  }

  listFilter: string = '0';  // Value bound to select HTML element for filtering items based upon fullfilled status (isComplete). This is a string as values coming from HTML elements are string type.

  changeFilter(value: string) {
    let valueNum = parseInt(value);
    // Want to emit the callback function that's used for the filter method on the array
    this.filter.emit(filters[valueNum]);
  }

}
