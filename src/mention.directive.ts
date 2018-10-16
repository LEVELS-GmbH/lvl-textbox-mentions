import {
  Directive,
  ElementRef,
  ViewContainerRef,
  HostListener,
  Output,
  EventEmitter,
  ComponentFactoryResolver, Input, OnChanges, SimpleChanges
} from '@angular/core';
import {TextboxMentionsComponent} from './textbox-mentions.component';
import {ListItem} from './list-item';

const ACCEPTED_EVENTS: any = [
  'insertText',
  'insertFromPaste',
  'insertFromDrop',
  'deleteContentBackward',
  'deleteContentForward'
];

const KEY_ENTER = 13;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

@Directive({selector: '[lvlsMention]'})
export class MentionDirective implements OnChanges {

  // the character that will trigger the menu behavior
  private defaultTriggerChar: any = ['@', '#'];
  private term: string;
  private lastTriggerAt: number;
  private lastTriggerChar: string;
  private triggered = false;
  private items: any;
  private mentionItems: TextboxMentionsComponent;

  // The Element
  readonly el: HTMLTextAreaElement;

  @Input() set lvlsMention(mentionItems: Array<ListItem>) {
    this.items = mentionItems;
  }

  @Output() searchTerm = new EventEmitter();
  @Output() selectedItem = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    private componentResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {
    this.el = this.elementRef.nativeElement;
    this.showSearchList(this.elementRef.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.mentionItems.items = this.items;
    this.mentionItems.show();
  }

  @HostListener('input', ['keyHandler($event)'])
  keyHandler(event: any, nativeElement: HTMLTextAreaElement | any = this.el) {
    if(nativeElement.tagName === 'ION-TEXTAREA') { nativeElement = nativeElement.getElementsByTagName('textarea')[0]; }
    if (event !== undefined) {
      if (ACCEPTED_EVENTS.includes(event.inputType)) {
        if (this.shouldBind(event, nativeElement)) {
          this.triggered = true;
          this.lastTriggerAt = this.nearestBindable(nativeElement);
          this.lastTriggerChar = nativeElement.value.charAt(this.lastTriggerAt);
        }

        if (
          this.triggered && (
            /[^0-9a-zA-Z#@]/i.test(event.data) ||
            !this.defaultTriggerChar.includes(nativeElement.value.charAt(this.lastTriggerAt))
          )
        ) {
          this.triggered = false;
          this.mentionItems.hide();
        }

        if (this.triggered) {
          this.term = this.filterTerm(nativeElement);
          this.emit();
          event.stopPropagation();
        }
      }
    }
  }

  @HostListener('keyup', ['onKeyup($event)'])
  onKeyup(event: any, nativeElement: HTMLTextAreaElement | any = this.el) {
    if(nativeElement.tagName === 'ION-TEXTAREA') { nativeElement = nativeElement.getElementsByTagName('textarea')[0]; }
    if (event !== undefined) {
      if(nativeElement.selectionEnd < this.lastTriggerAt) { this.mentionItems.hide(); }

      if (event.keyCode === KEY_LEFT || event.keyCode === KEY_RIGHT) {
        if (this.shouldBind(event, nativeElement)) {
          this.triggered = true;
          this.lastTriggerAt = this.nearestBindable(nativeElement);
          this.lastTriggerChar = nativeElement.value.charAt(this.lastTriggerAt);

          this.term = this.filterTerm(nativeElement);
          this.emit();
          event.stopPropagation();
          this.mentionItems.items = this.items;
          this.mentionItems.show();
        } else {
          this.triggered = false;
          this.mentionItems.hide();
        }
      }
    }
  }

  @HostListener('blur', ['onBlur($event)'])
  onBlur(event: any, nativeElement: HTMLTextAreaElement | any = this.el) {
    setTimeout(() => {
        this.mentionItems.hide();
    }, 500);

  }

  emit() {
    if (this.term.length > 0) {
      this.searchTerm.emit(this.term);
    }
  }

  filterTerm(nativeElement: HTMLTextAreaElement) {
    return nativeElement.value.substring(this.lastTriggerAt, nativeElement.selectionEnd);
  }

  shouldBind(event: any, nativeElement: HTMLTextAreaElement) {
    const text = nativeElement.value.substring(this.nearestBindable(nativeElement), nativeElement.selectionEnd);

    const hasBindNear = this.nearestBindable(nativeElement);
    if (hasBindNear !== undefined && hasBindNear !== -1) {
      return !this.hasInvalidChar(nativeElement.value.substring(hasBindNear, nativeElement.selectionEnd));
    }

    if (!this.defaultTriggerChar.includes(event.data)) {
      return false;
    }

    return true;
  }

  hasInvalidChar(text: string) {
    return /[^0-9a-zA-Z#@]/i.test(text);
  }

  nearestBindable(nativeElement: HTMLTextAreaElement): any {
    let bindAt;

    this.defaultTriggerChar.forEach((value) => {
      if (bindAt === undefined || nativeElement.value.lastIndexOf(value, nativeElement.selectionEnd) > bindAt) {
        bindAt = nativeElement.value.lastIndexOf(value, nativeElement.selectionEnd);
      }
    });

    return bindAt;
  }

  showSearchList(nativeElement: HTMLTextAreaElement) {
      const componentFactory = this.componentResolver.resolveComponentFactory(TextboxMentionsComponent);
      const componentRef = this.viewContainerRef.createComponent(componentFactory);
      this.mentionItems = componentRef.instance;
      this.mentionItems.items = this.items;
      this.mentionItems.position(nativeElement);
      this.mentionItems.show();

      this.mentionItems.itemClick.subscribe(
        data => {
          if(nativeElement.tagName === 'ION-TEXTAREA') { nativeElement = nativeElement.getElementsByTagName('textarea')[0]; }

          this.selectedItem.emit({
            item: this.mentionItems.item.name,
            lastTriggerAt: this.lastTriggerAt,
            lastTriggerChar: this.lastTriggerChar,
            selectionEnd: nativeElement.selectionEnd
          });

          nativeElement.value = nativeElement.value.substring(0, this.lastTriggerAt) + this.lastTriggerChar + this.mentionItems.item.name + nativeElement.value.substring(nativeElement.selectionEnd, nativeElement.value.length);
          nativeElement.focus();
          this.mentionItems.hide();
          this.items = [];
        }
      );

  }
}
