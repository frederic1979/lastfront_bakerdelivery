import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantSheetComponent } from './restaurant-sheet.component';

describe('RestaurantSheetComponent', () => {
  let component: RestaurantSheetComponent;
  let fixture: ComponentFixture<RestaurantSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
