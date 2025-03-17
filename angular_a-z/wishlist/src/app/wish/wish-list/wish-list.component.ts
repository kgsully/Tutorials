import { Component, Input } from '@angular/core';
import { WishItem } from '../../../shared/models/wishItem';
import { WishListItemComponent } from '../wish-list-item/wish-list-item.component';

@Component({
  selector: 'app-wish-list',
  imports: [WishListItemComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {

  // Explicitly defining the prop coming from app.component.html <app-wish-list [wishes]="visibleItems"> as an INPUT to this component
  // Note that using the InputSignal syntax (wishes = input<WishItem[]>([])) is the new and recommended method of achieving this for new projects
  // (make sure to import lowercase i 'input' from angular/core)-
  // HOWEVER, the @input decorator (syntax: @Input() wishes: WishItem[] = [];) is still fully supported at the time of writing this code
  @Input() wishes: WishItem[] = [];

}

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Excerpt Code from original implemntation with all functionality in the root app-component. This may have been either moved to other components,
// or deleted entirely based upon updates to implementation
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Moved to wish-list-item component
// toggleItem(item: WishItem) {
//   // Don't need to find the item in the item array because it is passed by reference
//   item.isComplete = !item.isComplete;
//   console.log(item);
// }
