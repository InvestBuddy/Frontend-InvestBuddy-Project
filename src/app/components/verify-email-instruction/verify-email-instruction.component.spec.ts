import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailInstructionComponent } from './verify-email-instruction.component';

describe('VerifyEmailInstructionComponent', () => {
  let component: VerifyEmailInstructionComponent;
  let fixture: ComponentFixture<VerifyEmailInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyEmailInstructionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyEmailInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
