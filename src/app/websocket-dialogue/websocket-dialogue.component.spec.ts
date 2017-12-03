import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsocketDialogueComponent } from './websocket-dialogue.component';

describe('WebsocketDialogueComponent', () => {
  let component: WebsocketDialogueComponent;
  let fixture: ComponentFixture<WebsocketDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsocketDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsocketDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
