import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productslist',
  imports: [RouterModule],
  templateUrl: './productslist.component.html',
  styleUrl: './productslist.component.css'
})
export class ProductslistComponent implements OnInit{
  products: any[] = [];
  constructor(private store: ProductsService) { }

  ngOnInit(): void {
    // Gives data for product list upon component load by subscribing to the observable from the service
    this.store.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

}
