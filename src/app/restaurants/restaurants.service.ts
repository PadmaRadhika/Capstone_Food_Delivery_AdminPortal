import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  // private apiUrl = 'http://localhost:8082/api/restaurants';
  private apiUrl = 'http://ec2-35-171-160-2.compute-1.amazonaws.com:8082/api/restaurants';

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {    
    return this.http.get<Restaurant[]>(this.apiUrl+'/all');
  }
  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/${id}`);
  }

  updateRestaurant(restaurantId: string | number, updateData: Restaurant): Observable<Restaurant> {
    const url = `${this.apiUrl}/edit/${restaurantId}`;
    return this.http.put<Restaurant>(url, updateData); // Use PATCH if you're partially updating
  }
  /**
   * Adds a new restaurant
   * @param newRestaurant - The data of the new restaurant to add
   * @returns An Observable of the created restaurant
   */
  addRestaurant(newRestaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.apiUrl+'/add', newRestaurant);
  }

  deleteRestaurant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
