import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CartComponent } from './pages/cart/cart.component';

// Note - for these routes, it is NOT going to affect the header as it will be specified only for the 'main' section below the header
export const routes: Routes = [
    {
        path: '',   // This is the 'default' route or / (e.g. localhost:4200)
        pathMatch: 'full',
        component: ProductsListComponent,
    },
    {
        path: 'cart',
        component: CartComponent,
    },
];
