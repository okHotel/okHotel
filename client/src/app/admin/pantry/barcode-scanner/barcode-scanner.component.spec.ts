import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BracodeScannerComponent } from './barcode-scanner.component';

describe('BracodeScannerComponent', () => {
  let component: BracodeScannerComponent;
  let fixture: ComponentFixture<BracodeScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BracodeScannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BracodeScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
