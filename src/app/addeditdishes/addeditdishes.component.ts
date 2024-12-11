import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DishService } from '../dishes/dish.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-addeditdishes',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, RouterModule],
  templateUrl: './addeditdishes.component.html',
  styleUrl: './addeditdishes.component.css'
})
export class AddeditdishesComponent {
  dishForm: FormGroup =  new FormGroup({});
  isEditMode = false;
  dishId: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private dishService: DishService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dishId = this.route.snapshot.paramMap.get('id') || '';
    this.isEditMode = !!this.dishId;

    this.dishForm = this.fb.group({
      name: ['', Validators.required],
      restaurantName: ['', Validators.required],      
      cuisine: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
    if (this.isEditMode) {
      this.dishService.getDishById(Number(this.dishId)).subscribe((data) => {
        this.dishForm.patchValue(data);
      });
    }
  }
  onSubmit(): void {
    if (this.dishForm.valid) {
      if (this.isEditMode) {
        this.dishService
          .updateDish(this.dishId, this.dishForm.value)
          .subscribe(() => { 
            this.router.navigate(['/dishes']);
          },
          (error) => {
            this.errorMessage = error.message;
          }
          );
      } else {
        this.dishService.addDish(this.dishForm.value).subscribe(() => {
          this.router.navigate(['/dishes']);
        },
        (error) => {
          this.errorMessage = error.message;
        }
        );
      }
    }
  }
}
