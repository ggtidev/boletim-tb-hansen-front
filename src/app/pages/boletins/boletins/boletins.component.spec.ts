import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletinsComponent } from './boletins.component';

describe('BoletinsComponent', () => {
  let component: BoletinsComponent;
  let fixture: ComponentFixture<BoletinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoletinsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoletinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
