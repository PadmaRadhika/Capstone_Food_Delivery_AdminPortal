import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditrestaurantsComponent } from './addeditrestaurants.component';

describe('AddeditrestaurantsComponent', () => {
  let component: AddeditrestaurantsComponent;
  let fixture: ComponentFixture<AddeditrestaurantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddeditrestaurantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddeditrestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
