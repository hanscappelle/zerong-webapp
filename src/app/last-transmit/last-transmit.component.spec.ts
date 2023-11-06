import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastTransmitComponent } from './last-transmit.component';

describe('LastTransmitComponent', () => {
  let component: LastTransmitComponent;
  let fixture: ComponentFixture<LastTransmitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LastTransmitComponent]
    });
    fixture = TestBed.createComponent(LastTransmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
