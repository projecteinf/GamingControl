import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JugadorsComponent} from './projecte/components/jugadors/jugadors.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JugadorsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gaming Mangement System';
}
