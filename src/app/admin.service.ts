import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';  // Import the map operator

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getStats(): Observable<{ restaurants: number, dishes: number }> {
    // Making two separate API calls
    // const restaurantsCount = this.http.get<number>('http://localhost:8082/api/restaurants/count');
    // const dishesCount = this.http.get<number>('http://localhost:8083/api/dishes/count');
    const restaurantsCount = this.http.get<number>('http://ec2-35-171-160-2.compute-1.amazonaws.com:8082/api/restaurants/count');
    const dishesCount = this.http.get<number>('http://ec2-35-171-160-2.compute-1.amazonaws.com:8083/api/dishes/count');
    

    // Using forkJoin to combine both observables
    return forkJoin([restaurantsCount, dishesCount]).pipe(
      map(([restaurants, dishes]: [number, number]) => {
        return { restaurants, dishes };
      })
    );
  }
}
