import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddWishFormComponent } from './add-wish-form/add-wish-form.component';
import { WishFilterComponent } from './wish-filter/wish-filter.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { WishItem } from '../../shared/models/wishItem';
// import events from './../shared/services/EventService';  // Original import before dependency injection refactor
import { EventService } from '../../shared/services/EventService';
import { WishService } from './wish.service';


@Component({
  selector: 'app-wish',
  imports: [FormsModule,
    AddWishFormComponent,
    WishFilterComponent,
    WishListComponent],
  templateUrl: './wish.component.html',
  styleUrl: './wish.component.css'
})
export class WishComponent implements OnInit{

  items: WishItem[] = [];
  // items: WishItem[] = [
  //   new WishItem('Learn Angular'),
  //   new WishItem('Get Coffee', true),
  //   new WishItem('Find grass that cuts itself')
  // ];

  // Constructor -
  // events: EventService added to constructor for dependency injection. Original implementation had no constructor arguments.
  // Don't need to make it a property with private as it is only being used within the constructor
  constructor(events: EventService, private wishService: WishService) {
    // access the Event Bus defined in the shared EventService
    events.listen('removeWish', (wish: any) => { // added this. prefix to events for dependency injection refactor
      let index = this.items.indexOf(wish);
      this.items.splice(index, 1)
    })
  }

  // ngOnInit fires when the component is initialized.
  ngOnInit(): void {
    // the subscribe takes a callback function as it's first parameter, but also a second callback function as it's second parameter to handle errors
    this.wishService.getWishes().subscribe(
      (data: any) => {
        this.items = data;
      },
      (error: any) => {
        alert(error.message);
      }
    )
  }

  // If not using 2 way binding on filter, you initialize the filter as a function so that when the filtering function is passed from the wish-filter component it can be used
  //  tutorial said to set this to any type and don't initialize (filter: any;), however that yielded an error in the browser console NG0100 - Expression changed after it was checked
  //  As such, manually setting this to a default value
  filter = (item: WishItem) => item;
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Excerpt Code from original implemntation with all functionality in the root app-component. This may have been either moved to other components,
// or deleted entirely based upon updates to implementation
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------
// Variables:
//----------------------------------------------------------------------------------------------------------------

  // filters Originally defined outside of class
  // const filters = [
  //   (item: WishItem) => item,
  //   (item: WishItem) => !item.isComplete,
  //   (item: WishItem) => item.isComplete
  // ];

  /// listFilter: string = '0';  // Value bound to select HTML element for filtering items based upon fullfilled status (isComplete). This is a string as values coming from HTML elements are string type.
  // newWishText: string = '';
  // visibleItems: WishItem[] = this.items;  // Original implementation using visibleItems array

  // items array used prior to refactor for retrieving wishes from the JSON file (mimicing HTTP request from an API endpoint)
  // items: WishItem[] = [
  //   new WishItem('Learn Angular'),
  //   new WishItem('Get Coffee', true),
  //   new WishItem('Find grass that cuts itself')
  // ];


//----------------------------------------------------------------------------------------------------------------
// Instance Methods:
//----------------------------------------------------------------------------------------------------------------

  // addNewWish() {
  //   this.items.push(new WishItem(this.newWishText))  // defaults to false based upon the wishItem model definition
  //   this.newWishText = ''; // clear the text in the box, clearing it here will clear it in the box due to 2 way binding
  // }

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

  // IMPLEMENTATION CHANGE - Defined this functionality declaratively in the HTML as opposed to programatically using this getter implementation
  // Getter implementation (JS, not Angular specific) to return a filtered version of the items array based upon list filter selector value
  // Using this method, EVERYTHING is based upon the items array. Any time the items array or any of the elements within the array are modified,
  // it will automatically be reflected wherever it is used. This is based upon the Javascript `get` syntax which creates/binds an object property
  // to a function that will be called when that property is looked up. See MDN docs for reference.
  // Also -> using a 'filters' array that contains anonymous functions to be used in items.filter(), indexed based upon select input options
  // original implementation needed let value = parseInt(this.listFilter); in order to parse the string value provided by the select input element in the HTML
  // NOTE ALSO that this can be removed from here (defined programatically) and put it into the html file (define declaratively)
  // get visibleItems(): WishItem[] {
  //   return this.items.filter(this.filter);
  // }
