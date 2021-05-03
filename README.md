Originally forked from [here](https://github.com/ingoncalves/escpos-xml)

# ESC/POS XML

Cross platform JavaScript library that implements the thermal printer ESC / POS protocol and provides an XML interface for preparing templates for printing.

## Features

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
- [x] XML with mustache


## Tested manually on following environments or platforms

- [x] React Native (Android)
- [x] React Native (iOS)
- [x] React Native Web
- [x] Server side (NodeJs)
- [x] Desktop applications (nwjs &amp; electron)
- [x] Other node environment (terminal)


## Installation

```bash
  yarn add @tillpos/xml-escpos-helper
```

## Examples

### With an XML template +  plain object input (regular text).

```ts

import { EscPos } from '@tillpos/xml-escpos-helper';

// store this template somewhere `s3` or as `static asset` based on your preference 
const template = `
  <?xml version="1.0" encoding="UTF-8"?>
  <document>
    <align mode="center">
      <bold>
        <text-line size="1:0">{{title}}</text-line>
      </bold>
    </align>

    {{#thankyouNote}}
    <align mode="center">
      <text-line size="0:0">  {{{thankyouNote}}}</text-line>
    </align>

    <line-feed />

    <paper-cut />
  </document>
`;

const input = {
  title: 'Sample',
  thankyouNote: 'Welcome...!'
};

const buffer = EscPos.getBufferFromTemplate(template, input);
// send this buffer to a stream (eg.: bluetooth or wifi)

```

### With an XML template +  png image (base64)

```ts
  const template =  `<?xml version="1.0" encoding="UTF-8"?>
  <document>
    <align mode="center">
      <bold>
        <text-line size="1:0">{{title}}</text-line>
      </bold>
        
      <image density="d24">
        {{base64PngImage}}
      </image>
    </align>    
  </document>`;

  const input = {
    title: 'PNG - base64',
    base64PngImage: `data:image/png;base64,iVBORw0KGgoAAA+P/AaNn2GPEMgEFAAAAAElFTkSuQmCC`
  };

  const buffer = EscPos.getBufferFromTemplate(template, input);
```

---

## TODO

- [ ] Font styles (font family)
- [ ] Image bitmap conversion improvements
- [ ] jpeg support
- [ ] Add example apps to repo
- [ ] Removed uglify for some reason, need to bring it back
- [ ] Improve image rendering

## Common issues

- If there is any delay you observe while printing with this library it is mostly due to image manipulations (try without image :mask: )


## Useful links / resources

- [ESC / POS Commands manual](./resources/ESCPOS_Command_Manual.pdf) 
- A [blog post](https://www.visuality.pl/posts/thermal-printer-protocols-for-image-and-text#:~:text=How%20can%20we%20print%20an,command%20language%20of%20thermal%20printers) explaiing about printing images with ESCPOS 
- Similar library for serverside - [node-escpos](https://github.com/song940/node-escpos).

> Limitations on the react-native framework

- [FileReader.readAsArrayBuffer](https://github.com/facebook/react-native/issues/21209) was not implemented.
- Most of popular image manupulation libraries does not have support for react-native. eg : [jimp](https://www.npmjs.com/package/jimp), [jpeg-js](https://www.npmjs.com/package/jpeg-js) and [sharp](https://www.npmjs.com/package/sharp). We can use these libraries with some native node lib implemented in react native (some sort of polyfill).  
- For png this [library](https://github.com/photopea/UPNG.js) seems to be faster, but when tested this library with it, it is not retaining pixels at some places) 
- Use this [node-libs-react-native](https://www.npmjs.com/package/node-libs-react-native) if we need to use this library in react native (adds some mock or js implementation for fs, stream etc)

---

Contributions of any kind welcome! :heart:

