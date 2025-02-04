import { Component, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductCardComponent } from "./product-card/product-card.component";

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

  // This should be in a service, not within the component, but is shown here now for illustrative purposes
  // Objective - Fetch available products for the store
  //             but when should those products be fetched? - Typically when the product page is loaded
  // Each Angular component has a number of lifecycle methods whose hoooks can be used to trigger things to run at specific times

  // ngOnInit is a lifecycle method gets called when a component is initializing
  // async ngOnInit() {
  //   const res = await fetch('https://fakestoreapi.com/products/category/electronics');
  //   const data = await res.json();
  //   this.products.set(data);
  // }

  // Dummy data to be used for tutorial purposes, in a real application, this would come from an api call to a DB, etc...
  // This data is taken from fakestoreapi.com and slightly modified
  products = signal<Product[]>([
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      stock: 10,
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      stock: 0,
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      stock: 4,
    },
    {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15.99,
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      stock: 12,
    },
    // {
    //   id: 5,
    //   title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    //   price: 695,
    //   image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    //   stock: 16,
    // },
    // {
    //   id: 6,
    //   title: "Solid Gold Petite Micropave ",
    //   price: 168,
    //   image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    //   stock: 0,
    // },
    // {
    //   id: 7,
    //   title: "White Gold Plated Princess",
    //   price: 9.99,
    //   image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    //   stock: 102,
    // },
    // {
    //   id: 8,
    //   title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    //   price: 10.99,
    //   image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    //   stock: 28,
    // },
    // {
    //   id: 9,
    //   title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    //   price: 64,
    //   image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    //   stock: 15,
    // },
    // {
    //   id: 10,
    //   title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    //   price: 109,
    //   image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    //   stock: 100,
    // }
  ]);
}
