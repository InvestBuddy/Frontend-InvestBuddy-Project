import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeParticlesComponent } from './three-particles.component';

describe('ThreeParticlesComponent', () => {
  let component: ThreeParticlesComponent;
  let fixture: ComponentFixture<ThreeParticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeParticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeParticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
