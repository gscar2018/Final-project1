import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
  standalone: true,
  imports: [RouterModule] // Add RouterModule here
})
export class TopMenuComponent {

  constructor(private router: Router) { }

  logout() {
    // Remove token from localStorage (or wherever you store it)
    localStorage.removeItem('token');
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }
}