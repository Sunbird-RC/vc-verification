import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyModuleComponent } from './verify-module.component';

describe('VerifyModuleComponent', () => {
  let component: VerifyModuleComponent;
  let fixture: ComponentFixture<VerifyModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
