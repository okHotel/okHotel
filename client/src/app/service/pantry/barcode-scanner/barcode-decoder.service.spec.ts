import { TestBed, inject } from '@angular/core/testing';

import { BarcodeDecoderService } from './barcode-decoder.service';

describe('BarcodeDecoderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarcodeDecoderService]
    });
  });

  it('should be created', inject([BarcodeDecoderService], (service: BarcodeDecoderService) => {
    expect(service).toBeTruthy();
  }));
});
