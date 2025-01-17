import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPredictionComponent } from './user-prediction.component';

describe('UserPredictionComponent', () => {
  let component: UserPredictionComponent;
  let fixture: ComponentFixture<UserPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPredictionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
