import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTopRatedComponent } from './show-top-rated.component';

describe('ShowTopRatedComponent', () => {
  let component: ShowTopRatedComponent;
  let fixture: ComponentFixture<ShowTopRatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTopRatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTopRatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
