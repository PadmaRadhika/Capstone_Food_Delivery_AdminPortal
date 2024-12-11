import { Component, OnInit } from '@angular/core';
import { DishService } from './dish.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FilterPipe } from '../filter.pipe';
import { Dish } from '../models/dish';


@Component({
  selector: 'app-dishes',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule, FormsModule, CommonModule,MatIconModule,RouterModule,MatTableModule,FilterPipe],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.css'
})
export class DishesComponent implements OnInit{
  dishes: Dish[] = [];
  filteredDishes: Dish[] = [];
  searchQuery: string = '';

  constructor(private dishService: DishService) {}

  ngOnInit(): void {
    this.fetchDishes();
  }

  fetchDishes(): void {
    this.dishService.getDishes().subscribe(data => {
      this.dishes = data;
      this.filteredDishes = data; // Initialize filtered array
    });
  }
  onSearch(): void {
    this.filteredDishes = this.dishes.filter(dish =>
      Object.values(dish).some(value =>
        String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
  }
  

  deleteDish(id: number): void {    
      this.dishService.deleteDish(id).subscribe(() => {        
        this.fetchDishes(); // Refresh the list
      });
    
  }
}
