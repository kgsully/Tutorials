import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WishItem } from '../shared/models/wishItem';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  items: WishItem[] = [
    new WishItem('Learn Angular'),
    new WishItem('Get Coffee', true),
    new WishItem('Find grass that cuts itself')
  ];
  listFilter: string = '0';
  newWishText: string = '';
  title: string = 'wishlist';
  visibleItems: WishItem[] = this.items;

  addNewWish() {
    this.items.push(new WishItem(this.newWishText))  // defaults to false based upon the wishItem model definition
    this.newWishText = ''; // clear the text in the box, clearing it here will clear it in the box due to 2 way binding
  }

  filterChanged(value: string) {
    if (value === '1') {
      this.visibleItems = this.items.filter(item => !item.isComplete);
    } else if (value === '2') {
      this.visibleItems = this.items.filter(item => item.isComplete);
    } else {
      this.visibleItems = this.items;
    }
  }

  toggleItem(item: WishItem) {
    // Don't need to find the item in the item array because it is passed by reference
    item.isComplete = !item.isComplete;
    console.log(item);
  }
}
