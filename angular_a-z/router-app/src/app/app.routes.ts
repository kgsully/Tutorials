import { Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';

export const routes: Routes = [
    // NOTE! No leading '/' required on the paths
    // ALSO! If you specify a blank string for path, that is essentially the same as '/' which indicates the home page
    // { path: '', component: FirstComponent},
    { path: 'first', component: FirstComponent},
    { path: 'second', component: SecondComponent},
];  // localhost:4200/<path> -> e.g. localhost:4200/first
