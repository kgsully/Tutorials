import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  imports: [],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent implements OnInit{

  product: any = {};

  // ActivatedRoute indicates the route / info about the route that is currently navigated to, or 'active'
  constructor(private store: ProductsService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
      // note that paramMap is an observable, so can call subscribe (and then pass in a callback function to subscribe)
      this.activeRoute.paramMap.subscribe((params: ParamMap) => {
        let id = params.get('id');
        if(id) {
          this.store.getProduct(parseInt(id, 10)).subscribe(product => this.product = product);
        }
      });
  }

}
