export enum Templates {
  PNG_IMAGE = 'PNG_IMAGE',
  BASIC = 'BASIC',
  QR_CODE = 'QR_CODE',
  BAR_CODE = 'BAR_CODE',
  TABLE = 'TABLE',
}

export const TEMPLATES = {
  [Templates.BASIC]: `<?xml version="1.0" encoding="UTF-8"?>
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
    {{/thankyouNote}}

    <line-feed />

    <paper-cut />
  </document>`,
  [Templates.PNG_IMAGE]: `
  <?xml version="1.0" encoding="UTF-8"?>
  <document>
    <align mode="center">
      <bold>
        <text-line size="0:0">{{title}}</text-line>
      </bold>
      <image>
        {{logo}}
      </image>
    </align>
    <paper-cut/>
  </document>`,
  [Templates.QR_CODE]: `
  <?xml version="1.0" encoding="UTF-8"?>
  <document>
    <align mode="center">
      <qrcode ecl="M">{{qrcode}}</qrcode>
    </align>
    <line-feed/>
    <paper-cut/>
  </document>
  `,
  [Templates.BAR_CODE]: `
  <?xml version="1.0" encoding="UTF-8"?>
  <document>
    <line-feed />
    <align mode="center">
      <barcode system="CODE_128" width="DOT_250">{{barcode}}</barcode>
    </align>
    <line-feed />
    <paper-cut/>
  </document>`,
  [Templates.TABLE]: `<?xml version="1.0" encoding="UTF-8"?>
  <document>
    <line-feed />
    <text-line>{{tableData}}</text-line>
    <paper-cut/>
  </document>`,
};
