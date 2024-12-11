import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditdishesComponent } from './addeditdishes.component';

describe('AddeditdishesComponent', () => {
  let component: AddeditdishesComponent;
  let fixture: ComponentFixture<AddeditdishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddeditdishesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddeditdishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
