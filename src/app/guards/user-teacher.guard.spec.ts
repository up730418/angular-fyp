import { TestBed, async, inject } from '@angular/core/testing';
import { MatInputModule, MatToolbarModule, MatIconModule, MatSidenavModule,
        MatListModule, MatButtonToggleModule, MatDialogModule, MatButtonModule,
        MatChipsModule, MatCardModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import { UserTeacherGuard } from './user-teacher.guard';
import { LoginService } from '../login.service';

describe('UserTeacherGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserTeacherGuard, LoginService],
      imports: [
        HttpModule,
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

  it('should ...', inject([UserTeacherGuard], (guard: UserTeacherGuard) => {
    expect(guard).toBeTruthy();
  }));
});
