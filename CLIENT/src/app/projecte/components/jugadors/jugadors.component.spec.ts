import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorsComponent } from './jugadors.component';

describe('JugadorsComponent', () => {
  let component: JugadorsComponent;
  let fixture: ComponentFixture<JugadorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JugadorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
