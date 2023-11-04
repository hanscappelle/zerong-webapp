import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUnitsComponent } from './get-units.component';

describe('GetUnitsComponent', () => {
  let component: GetUnitsComponent;
  let fixture: ComponentFixture<GetUnitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetUnitsComponent]
    });
    fixture = TestBed.createComponent(GetUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
