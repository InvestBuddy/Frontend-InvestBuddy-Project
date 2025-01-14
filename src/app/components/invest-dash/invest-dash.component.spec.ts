import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestDashComponent } from './invest-dash.component';

describe('InvestDashComponent', () => {
  let component: InvestDashComponent;
  let fixture: ComponentFixture<InvestDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
