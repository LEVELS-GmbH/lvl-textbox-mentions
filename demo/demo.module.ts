import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TextboxMentionsModule } from '../src';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [DemoComponent],
  imports: [BrowserModule, TextboxMentionsModule.forRoot()],
  bootstrap: [DemoComponent]
})
export class DemoModule {}
