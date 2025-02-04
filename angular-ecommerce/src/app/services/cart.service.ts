import { Injectable, signal } from '@angular/core';
import { Product } from '../models/products.model';

// Best practice to use Angular services when you have data access logic

@Injectable({
  providedIn: 'root' // This provides the context where the service is accessible. By default, it is set to root and as such is globally available
})
export class CartService {

  cart = signal<Product[]>([]);

  addToCart(product: Product) {
    // Syntax for updating an item of state (such as the signal) is .set().
    this.cart.set([...this.cart(), product]);
  }

  removeFromCart(id: number) {
    this.cart.set(this.cart().filter((p) => p.id !== id))
  }

  emptyCart() {
    this.cart.set([]);
  }

  constructor() { }
}
