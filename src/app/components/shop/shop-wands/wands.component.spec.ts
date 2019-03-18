import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WandsComponent } from './wands.component';

describe('WandsComponent', () => {
  let component: WandsComponent;
  let fixture: ComponentFixture<WandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
