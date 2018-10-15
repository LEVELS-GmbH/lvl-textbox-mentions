import { CommonModule } from '@angular/common';
import { MentionDirective } from './mention.directive';
import { TextboxMentionsComponent } from './textbox-mentions.component';
import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TextboxMentionsComponent, MentionDirective],
  exports: [TextboxMentionsComponent, MentionDirective],
  entryComponents: [TextboxMentionsComponent]
})
export class TextboxMentionsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TextboxMentionsModule
    };
  }
}
