import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { DishesComponent } from './dishes/dishes.component';
import { AuthGuard } from './auth.guard';
import { AddeditrestaurantsComponent } from './addeditrestaurants/addeditrestaurants.component';
import { AddeditdishesComponent } from './addeditdishes/addeditdishes.component';
const routeConfig: Routes = [  
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login page'
      },
    {
      path: 'home',
      component: HomeComponent,
      title: 'Home page',
      canActivate: [AuthGuard]
    },
    {
      path: 'restaurants',
      component: RestaurantsComponent,
      title: 'Restaurants page',
      canActivate: [AuthGuard]
    },
    {
        path: 'restaurants/new', // Add route for Add Restaurant
        component: AddeditrestaurantsComponent,
        title: 'Add Restaurant page',
        canActivate: [AuthGuard]
      },
      {
        path: 'restaurants/:id/edit', // Add route for Edit Restaurant
        component: AddeditrestaurantsComponent,
        title: 'Edit Restaurant page',
        canActivate: [AuthGuard]
      },
    {
        path: 'dishes',
        component: DishesComponent,
        title: 'Dishes page',
        canActivate: [AuthGuard]
      },
      {
        path: 'dishes/new', // Add route for Add Restaurant
        component: AddeditdishesComponent,
        title: 'Add Dish page',
        canActivate: [AuthGuard]
      },
      {
        path: 'dishes/:id/edit', // Add route for Edit Restaurant
        component: AddeditdishesComponent,
        title: 'Edit Dish page',
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    
  ];
  
  export default routeConfig;