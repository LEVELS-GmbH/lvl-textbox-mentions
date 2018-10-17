import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ListItem} from './list-item';

@Component({
  selector: 'lvls-textbox-mentions',
  styles: [`
    * {
      margin: 0;
      padding: 0;
    }`,
      `ul {
      list-style-type: none;
      display: inline-block;
      align-self: flex-end;
    }`,

      `h3 {
      font: bold 14px/1.5 Helvetica, Verdana, sans-serif;
    }`,

      `li img {
      float: left;
      margin: 0 15px 0 0;
    }`,

      `li p {
      font: 200 11px/1.5 sans-serif;
    }`,

      `li {
      padding: 5px;
      overflow: auto;
      text-align: left;
      background: #fdfdfd;
      color: #333;
      border-bottom: 1px #f9f9f9 solid;
    }`,
      `li:hover {
      background: #eee;
      cursor: pointer;
    }`],
  template: `
    <ul #list *ngIf="hidden">
      <li *ngFor="let item of items" (click)="selectItem(item); itemClick.emit();">
        <a class="dropdown-item">
          {{item.name}}
        </a>
      </li>
    </ul>
  `
})
export class TextboxMentionsComponent implements OnInit {
  items = [];
  item: ListItem;
  hidden = true;

  @Output() itemClick = new EventEmitter();

  @ViewChild('list') list: ElementRef;

  constructor(private _element: ElementRef) {
  }

  ngOnInit;

  position(nativeParentElement: HTMLTextAreaElement) {
    let el: HTMLElement = this._element.nativeElement.getElementsByTagName('textarea')[0];

    el.style.display = 'none';
    el.style.position = 'absolute';
    el.style.width = (nativeParentElement.offsetWidth > 50) ? nativeParentElement.offsetWidth + 'px' : '100%';
    el.style.height = '100px';
    el.style.top = (nativeParentElement.offsetTop - 100) + 'px';
    el.style.left = nativeParentElement.offsetLeft + 'px';
  }

  show() {
    this._element.nativeElement.style.display = 'flex';
    this.hidden = true;
  }

  hide() {
    this._element.nativeElement.style.display = 'none';
    this.hidden = false;
  }

  selectItem(item) {
    this.item = item;
    this.hide();
  }

}

