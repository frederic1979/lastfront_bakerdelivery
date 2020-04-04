import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationCommandComponent } from './creation-command.component';

describe('CreationCommandComponent', () => {
  let component: CreationCommandComponent;
  let fixture: ComponentFixture<CreationCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
