Originally forked from [here](https://github.com/ingoncalves/escpos-xml)

# ESC/POS XML

JavaScript library that implements the thermal printer ESC / POS protocol and provides an XML interface for preparing templates for printing. works with **reactjs** and **react-native**

**Features:**
- [x] Text
- [x] Text line
- [x] Feed line
- [x] Bold text
- [x] Underline text
- [x] Font size
- [x] Small mode
- [x] White mode
- [x] Align
- [x] Barcode
- [x] QRcode
- [x] Paper cut node
- [x] Image (base64) (png only)
- [x] XML with Handlebars
- [x] Handlebars [Moment](http://momentjs.com) Helper
- [x] Handlebars [Numeral](http://numeraljs.com) Helper
- [ ] Font family

## Installation

Using yarn:

```
yarn add xml-escpos-helper
```

## Usage

### From plain XML
```js

import { EscPos } from 'xml-escpos-helper';

const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <document>
    <text-line>hello world</text-line>
  </document>
`;

const buffer = EscPos.getBufferXML(xml);
// send this buffer to a stream (eg.: bluetooth or socket)

```

### From XML + Handlebars
```js

import { EscPos } from 'xml-escpos-helper';

const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <document>
    <text-line>{{foo}}</text-line>
  </document>
`;

const data = {
  foo: 'hello word'
};

const buffer = EscPos.getBufferFromTemplate(xml, data);
// send this buffer to a stream (eg.: bluetooth)

```

### From Builder
```js

import { EscPos } from 'xml-escpos-helper';


const buffer = EscPos.getBufferBuilder()
                             .printTextLine('hello world')
                             .build();
// send this buffer to a stream (eg.: bluetooth)

```

## Example

```js
import { EscPos } from 'xml-escpos-helper';

const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <document>
      <line-feed />
      <align mode="center">
          <bold>
              <text-line size="1:1">{{title}}</text-line>
          </bold>
          <line-feed />
          <small>
              <text-line>{{subtitle}}</text-line>
          </small>
      </align>
      <small>
          <text-line>Date: {{moment date format="DD/MM/YYYY HH:mm:ss"}}</text-line>
          <text-line size="1:0">{{numeral price format="$ 0,0.00"}}</text-line>
          <text-line size="1:0">{{paddedString}}</text-line>
      </small>
      <line-feed />
      <underline>
        <text-line>{{underline}}</text-line>
      </underline>
      <line-feed />
      <align mode="center">
          <white-mode>
              <text-line size="1:1">{{description}}</text-line>
          </white-mode>
          <line-feed />
          <bold>
              {{#if condictionA}}
              <text-line size="1:0">True A</text-line>
              {{else if condictionB}}
              <text-line size="1:0">True B</text-line>
              {{else}}
              <text-line size="1:0">False</text-line>
              {{/if}}
          </bold>
      </align>
      <line-feed />
      <align mode="center">
          <barcode system="CODE_128" width="DOT_250">{{barcode}}</barcode>
      </align>
      <line-feed />
      <align mode="center">
          <qrcode ecl="M">{{qrcode}}</qrcode>
      </align>
    <paper-cut/>
  </document>
`;

const data = {
  title: 'Tile',
  subtitle: 'Subtitle',
  description: 'This is a description',
  date: new Date(),
  price: 1.99,
  paddedString: '&nbsp;&nbsp;&nbsp;&nbsp;Line padded with 4 spaces',
  condictionA: false,
  condictionB: true,
  barcode: '12345678',
  qrcode: 'hello qrcode',
  underline: 'underline decorated text'
}

const buffer = EscPos.getBufferFromTemplate(xml, data);
// send this buffer to a stream (eg.: bluetooth)

```



# TODO

- [ ] remove build files from source code
- [ ] Font styles (font family)
- [ ] Image bitmap conversion improvements
- [ ] jpeg support
- [ ] Removed uglify for some reason, need to bring it back




# Useful links / resources

- [ESC / POS Commands manual](./resources/ESCPOS_Command_Manual.pdf) 
- A [blog post](https://www.visuality.pl/posts/thermal-printer-protocols-for-image-and-text#:~:text=How%20can%20we%20print%20an,command%20language%20of%20thermal%20printers) explaiing about printing images with ESCPOS 
- Similar library for serverside - [node-escpos](https://github.com/song940/node-escpos).

> Limitations on the react-native framework

- [FileReader.readAsArrayBuffer](https://github.com/facebook/react-native/issues/21209) was not implemented.
- Most of popular image manupulation libraries does not have support for react-native. eg : [jimp](https://www.npmjs.com/package/jimp), [jpeg-js](https://www.npmjs.com/package/jpeg-js) and [sharp](https://www.npmjs.com/package/sharp). We can use these libraries with some native node lib implemented in react native (some sort of polyfill).  
- For png this [library](https://github.com/photopea/UPNG.js) seems to be faster, but when tested this library with it, it is not retaining pixels at some places) 
- Use this [node-libs-react-native](https://www.npmjs.com/package/node-libs-react-native) if we need to use this library in react native (adds some mock or js implementation for fs, stream etc)
- If there is any delay you observe while printing with this library it is mostly due to image manipulations (try without image :mask: )
