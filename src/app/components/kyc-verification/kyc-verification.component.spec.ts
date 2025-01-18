import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycVerificationComponent } from './kyc-verification.component';

describe('KycVerificationComponent', () => {
  let component: KycVerificationComponent;
  let fixture: ComponentFixture<KycVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KycVerificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
