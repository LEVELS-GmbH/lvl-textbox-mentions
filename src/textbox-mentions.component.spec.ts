import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxMentionsComponent } from './textbox-mentions.component';

describe('TextboxMentionsComponent', () => {
  let component: TextboxMentionsComponent;
  let fixture: ComponentFixture<TextboxMentionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextboxMentionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextboxMentionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
