import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilitySettingComponent } from './accessibility-setting.component';

describe('AccessibilitySettingComponent', () => {
  let component: AccessibilitySettingComponent;
  let fixture: ComponentFixture<AccessibilitySettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessibilitySettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessibilitySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
