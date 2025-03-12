import { Component, Input } from '@angular/core';
import { WishItem } from '../../shared/models/wishItem';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {

  // Explicitly defining the prop coming from app.component.html <app-wish-list [wishes]="visibleItems"> as an INPUT to this component
  // Note that using the InputSignal syntax (wishes = input<WishItem[]>([])) is the new and recommended method of achieving this for new projects
  // (make sure to import lowercase i 'input' from angular/core)-
  // HOWEVER, the @input decorator (syntax: @Input() wishes: WishItem[] = [];) is still fully supported at the time of writing this code
  @Input() wishes: WishItem[] = [];

  toggleItem(item: WishItem) {
    // Don't need to find the item in the item array because it is passed by reference
    item.isComplete = !item.isComplete;
    console.log(item);
  }

}
