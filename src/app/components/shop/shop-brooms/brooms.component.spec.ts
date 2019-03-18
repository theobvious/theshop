import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroomsComponent } from './brooms.component';

describe('BroomsComponent', () => {
  let component: BroomsComponent;
  let fixture: ComponentFixture<BroomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
