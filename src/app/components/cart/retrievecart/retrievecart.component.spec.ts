import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievecartComponent } from './retrievecart.component';

describe('RetrievecartComponent', () => {
  let component: RetrievecartComponent;
  let fixture: ComponentFixture<RetrievecartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetrievecartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrievecartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
