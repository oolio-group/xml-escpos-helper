import Mustache from 'mustache';
import { XMLParser } from './xml-parser';
import { BufferBuilder } from './buffer-builder';

export class TemplateParser {
  private mustache: any;

  constructor() {
    this.mustache = Mustache;
  }

  public parser(template, scope): BufferBuilder {
    const xml = this.mustache.render(template, scope);
    return new XMLParser().parser(xml);
  }
}
