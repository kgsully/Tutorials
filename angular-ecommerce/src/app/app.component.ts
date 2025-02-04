import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
// import { ProductsListComponent } from "./pages/products-list/products-list.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet], // Removed default item 'RouterOutlet' temporarily, and replaced with ProductsListComponent for initial dev
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-ecommerce';
}
