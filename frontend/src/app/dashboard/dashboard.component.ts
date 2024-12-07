import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { TopMenuComponent } from '../top-menu/top-menu.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone : true,
  imports: [FormsModule, TopMenuComponent],  // Import FormsModule
})
export class DashboardComponent {

}