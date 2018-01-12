import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MatInputModule, MatToolbarModule, MatIconModule, MatSidenavModule,
        MatListModule, MatButtonToggleModule, MatDialogModule, MatButtonModule,
        MatChipsModule, MatCardModule } from '@angular/material';

import { LessonService } from './lesson.service';
import { LoginService, LoginDialog } from './login.service';

describe('LessonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LessonService, LoginService],
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
      ],
    });
  });

  it('should be created', inject([LessonService], (service: LessonService) => {
    expect(service).toBeTruthy();
  }));
});
