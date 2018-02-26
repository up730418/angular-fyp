import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule, MatToolbarModule, MatIconModule, MatSidenavModule,
        MatListModule, MatButtonToggleModule, MatDialogModule, MatButtonModule,
        MatChipsModule, MatCardModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import { UserEntryGuard } from './user-entry.guard';
import { LoginService } from '../login.service';

describe('UserEntryGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserEntryGuard, LoginService],
      imports: [
        HttpModule,
        RouterTestingModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatButtonModule,
        MatChipsModule,
        MatCardModule,
        ]
    });
  });

  it('should ...', inject([UserEntryGuard], (guard: UserEntryGuard) => {
    expect(guard).toBeTruthy();
  }));
});
