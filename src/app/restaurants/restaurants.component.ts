import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from './restaurants.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FilterPipe } from '../filter.pipe';
import { Restaurant } from '../models/restaurant';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule, FormsModule, CommonModule,MatIconModule,RouterModule,MatTableModule,FilterPipe],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css'
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  searchQuery: string = '';

  constructor(private restaurantService: RestaurantsService) {}

  ngOnInit(): void {
    this.fetchRestaurants();
  }

  fetchRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(data => {
      this.restaurants = data;      
    });
  }
  // Call deleteRestaurant method from the service
  deleteRestaurant(restaurantId: number): void {
    this.restaurantService.deleteRestaurant(restaurantId).subscribe(() => {
      // On success, remove the deleted restaurant from the local array
      this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== restaurantId);
    });
  }
}
