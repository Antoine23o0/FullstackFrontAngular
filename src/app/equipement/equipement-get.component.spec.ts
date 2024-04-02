import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementGetComponent } from './equipement-get.component';

describe('EquipementGetComponent', () => {
  let component: EquipementGetComponent;
  let fixture: ComponentFixture<EquipementGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipementGetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquipementGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
