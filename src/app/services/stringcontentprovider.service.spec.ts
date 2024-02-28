import { TestBed } from '@angular/core/testing';

import { StringcontentproviderService } from './stringcontentprovider.service';

describe('StringcontentproviderService', () => {
  let service: StringcontentproviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringcontentproviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
