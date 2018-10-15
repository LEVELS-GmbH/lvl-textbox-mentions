import { Component } from '@angular/core';

@Component({
  selector: 'lvls-demo-app',
  template: `
  <textarea name="text" id="text" cols="60" rows="10" [lvlsMention]="items" (searchTerm)="search($event)"></textarea>
  `
})
export class DemoComponent {
  public items: any;

  search() {

  }
}
