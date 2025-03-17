import { Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    // NOTE! No leading '/' required on the paths
    // ALSO! If you specify a blank string for path, that is essentially the same as '/' which indicates the home page
    // THE ROUTING TABLE ORDER MATTERS! ANGULAR USES A FIRST-MATCH POLICY AND STARTS WITH THE FIRST ELEMENT IN THE ROUTING TABLE ARRAY
    { path: '', component: FirstComponent},
    { path: 'first', component: FirstComponent},
    { path: 'second', component: SecondComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'products', component: ProductsComponent},
    // The double asterisk '**' is a wildcard. Basically a catch all for anything that is not otherwise specified
    { path: '**', component: NotFoundComponent},
];  // localhost:4200/<path> -> e.g. localhost:4200/first
