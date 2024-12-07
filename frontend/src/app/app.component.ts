import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, FormsModule],  // Import RouterModule without forRoot
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}