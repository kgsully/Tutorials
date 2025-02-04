import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {

  cartService = inject(CartService);

  // Dynamically calculate total of all items in the cart using .computed()
  // Because .cart() is a signal, whenever it changes, this will run to update as well
  total = computed(() => {
    let total: number = 0;
    for (const item of this.cartService.cart()) {
      total += item.price;
    }
    return total;
  })

  // Added functionality to do something when clicking the checkout button
  checkoutButtonClicked() {
    if (this.cartService.cart().length > 0) {
      this.cartService.emptyCart();
      alert('Checkout Successful!');
    } else {
      alert('Cart is Empty!');
    }
  }
}
