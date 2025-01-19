import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilRegularUserComponent } from './profil-regular-user.component';

describe('ProfilRegularUserComponent', () => {
  let component: ProfilRegularUserComponent;
  let fixture: ComponentFixture<ProfilRegularUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilRegularUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilRegularUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
