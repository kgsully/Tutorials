import { Component } from '@angular/core';
import { ProductslistComponent } from './productslist/productslist.component';

@Component({
  selector: 'app-products',
  imports: [ProductslistComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
