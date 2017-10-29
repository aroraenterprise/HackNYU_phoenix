import { Component, Input, OnChanges } from '@angular/core';
import marked from 'marked';

@Component({
  selector: 'markdown-html',
  templateUrl: 'markdown-html.html'
})
export class MarkdownHtmlComponent implements OnChanges {

  @Input() content: string;
  html: string;

  constructor() {
  }

  ngOnChanges(){
    this.html = this.content ? marked(this.content) : '';
  }


}
