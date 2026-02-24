import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomplishmentPageComponentComponent } from './accomplishment-page-component.component';

describe('AccomplishmentPageComponentComponent', () => {
  let component: AccomplishmentPageComponentComponent;
  let fixture: ComponentFixture<AccomplishmentPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccomplishmentPageComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccomplishmentPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
