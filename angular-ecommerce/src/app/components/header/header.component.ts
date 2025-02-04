import { Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'  // angular uses the concept of style encapsulation. Styles defined for this component are only available to THIS component
})
export class HeaderComponent {

  // Inject Angular Service we created for the cart for use by this component
  cartService = inject(CartService)

  // cartBtnLabel = signal('Cart');  // Example for using a dynamic variable / expression for the cart button label

  // Initial test event handler for button click. Replaced with router link directive in HTML
  // showButtonClicked() {
  //   for (const item of this.cartService.cart()) {
  //     console.log(item.title);
  //   }
  // }
}

// ---------------------------------------------------------------------------------------------------------------------
// NOTES:
// ---------------------------------------------------------------------------------------------------------------------

// Angular has been moving towards signals for dynamic data, best practice to use them
// instead of simple variables when dynamic data may be involved. They have methods to set values, etc
// They are accessed in the string interpolation in the HTML by calling the variable name as a function with () suffix
// title = `signal('Tutorial E-Commerce App');
// HTML: <span>{{ title() }}</span>
