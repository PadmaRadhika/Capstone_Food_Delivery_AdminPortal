import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Dish } from '../models/dish';
import { catchError } from 'rxjs/operators';  

@Injectable({
  providedIn: 'root'
})
export class DishService {
  // private apiUrl = 'http://localhost:8083/api/dishes';
  private apiUrl = 'http://ec2-35-171-160-2.compute-1.amazonaws.com:8083/api/dishes';

  constructor(private http: HttpClient) {}

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl+'/all');
  }
  getDishById(id: number): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiUrl}/${id}`);
  }

  updateDish(dishId: string | number, updateData: Dish): Observable<Dish> {
    const url = `${this.apiUrl}/edit/${dishId}`;
    return this.http.put<Dish>(url, updateData).pipe(
      catchError((error) => {
        // Handle the error here, and return an observable with the error message
        let errorMessage = 'An error occurred while updating the dish';
        if (error.status === 404) {
          // Handle restaurant not found error
          errorMessage =  'Restaurant not found! Enter an existing Restaurant';
        } else if (error.status === 500) {
          errorMessage = 'An unexpected error occurred.';
        } else {
          errorMessage = 'An error occurred: ' + error.message;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  /**
   * Adds a Dish
   * @param newDish - The data of the new dish to add
   * @returns An Observable of the created dish
   */
  addDish(newDish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.apiUrl+'/add', newDish).pipe(
      catchError((error) => {
        // Handle the error here, and return an observable with the error message
        let errorMessage = 'An error occurred while adding the dish';
        if (error.status === 404) {
          // Handle restaurant not found error
          errorMessage =  'Restaurant not found! Enter an existing Restaurant';
        } else if (error.status === 500) {
          errorMessage = 'An unexpected error occurred.';
        } else {
          errorMessage = 'An error occurred: ' + error.message;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  

  deleteDish(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
