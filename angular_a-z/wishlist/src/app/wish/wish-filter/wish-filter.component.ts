import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WishItem } from '../../../shared/models/wishItem';

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
  // Can initialize this if we want to, but in this particular case, don't really need to
  @Input() filter: any;
  // Note the naming convention for this - for 2 way bindings, in order for angular to recognize the link between the input and output,
  // need to name the output the same name as the input, but followed by `Change`.
  @Output() filterChange = new EventEmitter<any>();

  // since the filter variable within app-component initializes to an empty function (() => {}), no filtering will be applied until the value is set
  // ngOnInit will fire when the component is initialized and will emit a default value for the filter to app-component to pass to the wish-list component
  ngOnInit(): void {
    // this.filter.emit(filters[0]); // This code was when there was only a 1 way binding set up
    this.updateFilter('0');
  }

  listFilter: string = '0';  // Value bound to select HTML element for filtering items based upon fullfilled status (isComplete). This is a string as values coming from HTML elements are string type.

  updateFilter(value: string) {
    let valueNum = parseInt(value);

    this.filter = filters[valueNum];  // Update the @Input filter when the filter is changed based upon the select input field
    this.filterChange.emit(this.filter); // Emit the callback function that's used for the filter method on the array
  }

}
