import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private data: any[] = [
    {id: 1, name: "Guitar", price: 1000},
    {id: 2, name: "Piano", price: 5000},
    {id: 3, name: "Drums", price: 1200},
  ];

  constructor() { }

  // Not just going to provide the array as a return, but going to provide an observable that will then provide access to the data array when it is subscribed to
  // That's what the of() method does, and it is from rxJS
  getAllProducts() {
    return of(this.data);
  }

  getProduct(id: number) {
    return of(this.data.find(p => p.id === id));
  }
}
