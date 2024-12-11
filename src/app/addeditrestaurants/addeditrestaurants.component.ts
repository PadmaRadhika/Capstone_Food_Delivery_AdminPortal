import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-addeditrestaurants',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, RouterModule],
  templateUrl: './addeditrestaurants.component.html',
  styleUrl: './addeditrestaurants.component.css'
})
export class AddeditrestaurantsComponent {
  restaurantForm: FormGroup =  new FormGroup({});
  isEditMode = false;
  restaurantId: string = '';

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('id') || '';
    this.isEditMode = !!this.restaurantId;

    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],      
      cuisine: ['', Validators.required],
    });
    if (this.isEditMode) {
      this.restaurantService.getRestaurantById(Number(this.restaurantId)).subscribe((data) => {
        this.restaurantForm.patchValue(data);
      });
    }
  }
  onSubmit(): void {
    if (this.restaurantForm.valid) {
      if (this.isEditMode) {
        this.restaurantService
          .updateRestaurant(this.restaurantId, this.restaurantForm.value)
          .subscribe(() => this.router.navigate(['/restaurants']));
      } else {
        this.restaurantService.addRestaurant(this.restaurantForm.value).subscribe(() => this.router.navigate(['/restaurants']));
      }
    }
  }
}
