import { TestBed } from '@angular/core/testing';

import { PortadasService } from './portadas.service';

describe('PortadasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortadasService = TestBed.get(PortadasService);
    expect(service).toBeTruthy();
  });
});
