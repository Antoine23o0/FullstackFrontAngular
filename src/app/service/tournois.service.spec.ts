import { TestBed } from '@angular/core/testing';

// @ts-ignore
import { TournoisService } from './services/tournois.service';

describe('TournoisService', () => {
  let service: TournoisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournoisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
