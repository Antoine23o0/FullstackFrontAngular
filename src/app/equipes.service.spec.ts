import { TestBed } from '@angular/core/testing';

import { EquipesService } from './services/equipes.service';

describe('EquipesService', () => {
  let service: EquipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
