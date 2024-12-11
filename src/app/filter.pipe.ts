import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchQuery: string): any[] {
    if (!items) return [];
    if (!searchQuery) return items;
    
    // Case insensitive filtering
    searchQuery = searchQuery.toLowerCase();
    
    return items.filter(item =>{
      // Filtering for restaurants
      if (item.hasOwnProperty('name') && item.hasOwnProperty('cuisine') && item.hasOwnProperty('address')) {
      return item.name.toLowerCase().includes(searchQuery) ||  // Filter by name
      item.cuisine.toLowerCase().includes(searchQuery) ||  // Filter by cuisine
      item.address.toLowerCase().includes(searchQuery)   // Filter by price
      }
      // Filtering for dishes (assuming dishes have similar properties)
      if (item.hasOwnProperty('name') && item.hasOwnProperty('price')  && item.hasOwnProperty('cuisine')  && item.hasOwnProperty('restaurantName')) {
        const priceString = item.price ? item.price.toString().toLowerCase() : '';
        return item.name.toLowerCase().includes(searchQuery) ||  // Filter by name
          priceString.includes(searchQuery) || // Filter by price
          item.cuisine.toLowerCase().includes(searchQuery)  ||
          item.restaurantName.toLowerCase().includes(searchQuery)   
      }

      return false;
    }
    );
  }
  
}
