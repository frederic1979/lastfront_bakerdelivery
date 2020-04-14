import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuturCommandComponent } from './futur-command.component';

describe('FuturCommandComponent', () => {
  let component: FuturCommandComponent;
  let fixture: ComponentFixture<FuturCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuturCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuturCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
