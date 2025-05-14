import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; 

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    RouterOutlet,
    RouterLink,  
    RouterLinkActive,
    CommonModule 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'CarsApp'; 
  currentYear = new Date().getFullYear();
}