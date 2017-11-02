import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: 'ion-textarea[autoresize]' // Attribute selector
})
export class AutoresizeTextareaDirective implements OnInit {

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  constructor(
    private el: ElementRef
  ) {

  }

  ngOnInit() {
    this.adjust();
  }

  public adjust() {
    let ta = this.el.nativeElement.querySelector('textarea');
    if (ta) {
      ta.style.overflow = 'hidden';
      ta.style.height = 'auto';
      ta.style.height = ta.scrollHeight + 'px';
    }
  }

}
