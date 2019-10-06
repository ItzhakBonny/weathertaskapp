import { TestBed } from '@angular/core/testing';

import { FavoritesStoreService } from './favorites-store/favorites-store.service';

describe('FavoritesStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoritesStoreService = TestBed.get(FavoritesStoreService);
    expect(service).toBeTruthy();
  });
});
