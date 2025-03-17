import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// SEE app.routes.ts FOR MORE INFORMATION - THIS IS A BASIC APPLICATION TO ILLUSTRATE ANGULAR ROUTER USAGE

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'router-app';
}
