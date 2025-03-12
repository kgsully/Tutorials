import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WishItem } from '../shared/models/wishItem';
import { WishListComponent } from './wish-list/wish-list.component';

const filters = [
  (item: WishItem) => item,
  (item: WishItem) => !item.isComplete,
  (item: WishItem) => item.isComplete
];

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet, WishListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  items: WishItem[] = [
    new WishItem('Learn Angular'),
    new WishItem('Get Coffee', true),
    new WishItem('Find grass that cuts itself')
  ];
  listFilter: string = '0';  // Value bound to select HTML element for filtering items based upon fullfilled status (isComplete). This is a string as values coming from HTML elements are string type.
  newWishText: string = '';
  title: string = 'wishlist';
  // visibleItems: WishItem[] = this.items;  // Original implementation using visibleItems array

  addNewWish() {
    this.items.push(new WishItem(this.newWishText))  // defaults to false based upon the wishItem model definition
    this.newWishText = ''; // clear the text in the box, clearing it here will clear it in the box due to 2 way binding
  }

  // Getter implementation (JS, not Angular specific) to return a filtered version of the items array based upon list filter selector value
  // Using this method, EVERYTHING is based upon the items array. Any time the items array or any of the elements within the array are modified,
  // it will automatically be reflected wherever it is used. This is based upon the Javascript `get` syntax which creates/binds an object property
  // to a function that will be called when that property is looked up. See MDN docs for reference.
  // Also -> using a 'filters' array that contains anonymous functions to be used in items.filter(), indexed based upon select input options
  get visibleItems(): WishItem[] {
    let value = parseInt(this.listFilter);
    return this.items.filter(filters[value]);
  }

  // Original implementation using visibleItems array variable with (ngModelChanged) event
  // Contained the following bugs:
  //     1. Adding a new item while the filter was set to Unfulfilled would not make the new item appear in the list until the filter was reset and re-selected
  //     2. Seeing the effect of checking or unchecking an item while filtered would require a reset/re-selection of the filter from the select box
  //  Both of these bugs were could be fixed by updating the visibleItems array any time there was a change to the items array or any of the contained elements,
  //  but a simpler fix was to change visibleItems into a 'getter' using the built in JS 'get' syntax to make it a 'dynamic' object
  // filterChanged(value: string) {
    // if (value === '1') {
    //   this.visibleItems = this.items.filter(item => !item.isComplete);
    // } else if (value === '2') {
    //   this.visibleItems = this.items.filter(item => item.isComplete);
    // } else {
    //   this.visibleItems = this.items;
    // }
  // }

  // This was moved to wish-list.component.ts in the wish-list component
  // toggleItem(item: WishItem) {
  //   // Don't need to find the item in the item array because it is passed by reference
  //   item.isComplete = !item.isComplete;
  //   console.log(item);
  // }
}
