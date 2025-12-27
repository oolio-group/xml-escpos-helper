import { TemplateParser } from './template-parser';
import { XMLParser } from './xml-parser';
import { BufferBuilder } from './buffer-builder';

export class EscPos {

  public static getBufferFromTemplate(template: string, data: any, shouldReset: boolean = true): number[] {
    let templateParser = new TemplateParser();
    return templateParser.parser(template, data, shouldReset).build();
  }

  public static getBufferFromXML(xml: string, shouldReset: boolean = true): number[] {
    let xmlParser = new XMLParser();
    return xmlParser.parser(xml, shouldReset).build();
  }

  public static getBufferBuilder(shouldReset: boolean = true): BufferBuilder {
    return new BufferBuilder(shouldReset);
  }

}
