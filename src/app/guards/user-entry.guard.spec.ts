import { TestBed, async, inject } from '@angular/core/testing';

import { UserEntryGuard } from './user-entry.guard';

describe('UserEntryGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserEntryGuard]
    });
  });

  it('should ...', inject([UserEntryGuard], (guard: UserEntryGuard) => {
    expect(guard).toBeTruthy();
  }));
});
