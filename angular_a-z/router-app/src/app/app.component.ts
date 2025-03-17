import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router'; // Can alternatively import JUST RouterLink here and specify it in the imports array

// SEE app.routes.ts FOR MORE INFORMATION - THIS IS A BASIC APPLICATION TO ILLUSTRATE ANGULAR ROUTER USAGE

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'router-app';

  // Navigate by using a Router object, and that can be injected into our component
  constructor(private router: Router) {}

  // Since the Router object was injected, we can now use it's `navigate` method
  goToContact() {
    // This may seem weird, but is actually a good design. You pass an array to the `navigate` method, which allows you to BUILD a URL
    // Generally in vanilla JS, you build a URL by concatenating strings together or use a template string, which involves additional work, etc
    // What `navigate` allows us to do is to pass an array where each of the elements of the array are the different parts of the URL
    this.router.navigate(['contact'])
  }
}
