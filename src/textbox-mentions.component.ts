import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
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
      width: 100%;
      display: inline-block;
      
    }`,
    `ul:before {
      content: attr(title);
      color: #777;
      background: #ddd;
      border-top: #ccc solid 1px;
      border-bottom: #ccc solid 1px;
      display: block;
      padding: 2px 10px;
      font-weight: bold;
    }`,
    `h3 {
      font: bold 14px/1.5 Helvetica, Verdana, sans-serif;
    }`,

    `li img {
      float: left;
      margin: 0 5px 0 0;
    }`,
    `li p {
      font: 200 11px/1.5 sans-serif;
    }`,
    `li a {
      color: #333;
    }`,
    `li a span {
      color: #bbb;
    }`,
      `li {
      padding: 5px;
      overflow: auto;
      text-align: left;
      color: #333;
      border-bottom: 1px #fff solid;
      background: #f7f7f7;
    }`,

    `li a {
      color: #333;
       
    }`,
    `li:hover {
      background: #eee;
      cursor: pointer;
    }`,
    `.badge-image, .profile-image {
      width: 25px;
    }`,
    `.align-end {align-self: flex-end; }`,
    `.profile-image {
      border-radius: 50%;
    }`],
  template: `
    <ul #list *ngIf="hidden" title="  Suggestions" [class.align-end]="listPosition === 'top'">
      <li *ngFor="let item of items" (click)="selectItem(item); itemClick.emit();">
        <a class="dropdown-item">
          <img [src]="item.badgeImage" alt="badge" class="badge-image">
          <img [src]="item.profilePhoto" alt="profile image" class="profile-image">
          {{item.name ? item.name : item.nickname}}
          <span *ngIf="item.name">{{item.nickname}}</span>
        </a>
      </li>
    </ul>
  `
})
export class TextboxMentionsComponent implements OnInit {
  public items: ListItem[] = [];
  public item: ListItem;
  public hidden = true;
  public nativeElement: HTMLTextAreaElement;
  public listPosition: any = '';

  @Output() itemClick = new EventEmitter();

  @ViewChild('list') list: ElementRef;

  constructor(private _element: ElementRef) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log((this.nativeElement.offsetTop - this.nativeElement.scrollHeight));
    this._element.nativeElement.style.top = ((this.nativeElement.scrollHeight - this.nativeElement.offsetTop) - 20) + 'px'
  }

  ngOnInit;

  position(nativeParentElement: HTMLTextAreaElement, position: string = 'top') {
    this.listPosition = position;

    let el: HTMLElement = this._element.nativeElement;

    // el.style.background = 'transparent';
    el.style.display = 'none';
    el.style.width = (this.nativeElement.offsetWidth > 50) ? this.nativeElement.offsetWidth + 'px' : '100%';
    el.style.height = '100px';

    if (position === 'top') {
      el.style.position = 'absolute';
      el.style.top = (this.nativeElement.offsetTop - 100) + 'px';
      // el.style.left = nativeParentElement.offsetLeft + 'px';
    }
    else {
      el.style.position = 'absolute';
      el.style.top = this.nativeElement.style.height + 'px';
    }
    el.style.width = '100%';
    el.style.left = '0px';
  }

  show() {
    this._element.nativeElement.style.display = 'flex';
    this.hidden = true;
  }

  hide() {
    this._element.nativeElement.style.display = 'none';
    this.hidden = false;
  }

  selectItem(item: any) {
    this.item = item;
    this.hide();
  }

}

