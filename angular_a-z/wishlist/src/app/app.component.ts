import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WishComponent } from './wish/wish.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WishComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{

}

// REFACTORED APP COMPONENT TO PUT ALL WISH RELATED CODE INTO IT'S OWN STANDALONE WISH COMPONENT WHICH IS THEN IMPORTED
// INTO APP COMPONENT FOR USE AS NECESSARY
