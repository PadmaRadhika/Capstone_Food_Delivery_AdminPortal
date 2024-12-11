import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  totalRestaurants = 0;
  totalDishes = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getStats().subscribe(data => {
      this.totalRestaurants = data.restaurants;
      this.totalDishes = data.dishes;
    });
  }
}
