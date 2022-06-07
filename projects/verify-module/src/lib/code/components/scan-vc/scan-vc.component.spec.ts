import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanVcComponent } from './scan-vc.component';

describe('ScanVcComponent', () => {
  let component: ScanVcComponent;
  let fixture: ComponentFixture<ScanVcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanVcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanVcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
