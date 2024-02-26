# XML Schema for xml-escpos-helper

## `<document>` Element

This is the root XML element of an ESC/POS template.

### Attributes

#### `reverse`

If set, enables reverse (upside-down) printing.

## `<align>` Element

Sets the alignment of text contained by this element.

### Attributes

#### `mode`

`mode=`  | Effect
---------|-------
`left`   | Contents are left justified.
`right`  | Contents are right justified.
`center` | Contents are centered.

## `<barcode>` Element

Prints the contained text in barcode form.

### Attributes

#### `system`

The bar code system to print. Required. One of:

- `CODABAR`
- `CODE_39`
- `CODE_93`
- `CODE_128`
- `EAN_8`
- `EAN_13`
- `ITF`
- `UPC_A`
- `UPC_E`

#### `width`

The width of the bar code when printed. One of:

- `DOT_250`
- `DOT_375` (default)
- `DOT_560`
- `DOT_625`
- `DOT_750`


#### `labelFont`

The font used to print the textual label that accompanies the bar code. One of:

- `FONT_A` (default)
- `FONT_B`

#### `labelPosition`

The position of the textual label that accompanies the bar code. One of:

`labelPostion=` | Effect
----------------|-------
`NOT_PRINT`     | Disables printing the label.
`ABOVE`         | Print the label above the bar code.
`BOTTOM`        | Print the label below the bar code (default).
`ABOVE_BOTTOM`  | Print the label both above and below the bar code.

#### `height`

The height of the bar code, in dots. If specified, must be a positive integer.
If not specified, defaults to 162 dots.

#### `leftSpacing`

How many dots to pad the bar code with on the left side.
If specified, must be a positive integer. Defaults to 0 dots.

## `<bold>` Element

Prints the contents in bold.

## `<break-line>` Element

Inserts one or more line breaks, usually after printing one or more `<text>` elements.

### Attributes

#### `lines`

The number of lines to insert. Must be a positive integer. Default value is 1.

## `<image>` Element

Prints the image contained by this element.
Image data should be URL-encoded base-64 PNG; it should be prefixed with
"data:image/png;base64,"

### Attributes

#### `mode`

The print mode for the image.

`mode=`               | Effect
----------------------|-------
`NORMAL`              | Print image with no scaling (default).
`DOUBLE_WIDTH`        | Print image at 2x width.
`DOUBLE_HEIGHT`       | Print image at 2x height.
`DOUBLE_WIDTH_HEIGHT` | Print image at 2x width and height.

## `<line-feed>` Element

Inserts a single line break.

## `<open-cash-drawer>` Element

Opens the cash drawer on so-equipped printers.

## `<paper-cut>` Element

Cuts the paper on printers with an automated cutter.

## `<print-mode>` Element

Sets the print mode for specific printer models.

### Attributes

#### `mode`

If mode is 'U220', enables support for that printer model.
Supports generic printers otherwise.

## `<qrcode>` Element

Prints the contained text in QR code form.

### Attributes

#### `model`

Selects the model of QR code

`model=` | Effect
---------|-------
1        | Model 1 QR code.
2        | Model 2 QR code (default).

#### `size`

Sets the size of each QR code module (pixel), in dots.
Must be a positive integer, default value is 8.

#### `ecl`

Sets the error correction level. One of:

`ecl=` | Effect
-------|-------
`L`    | Low error correction (default).
`M`    | Medium error correction.
`Q`    | "Quality" error correction.
`H`    | High error correction.

## `<small>` Element

Prints its contents in small font.

## `<text>` Element

Prints its context, without a line feed at the end.

### Attributes

#### `size`

Sets the size of the text.
Must be in "x:y" format, where x and y are the horizontal and vertical character sizes.
Both x and y must be non-negative integers. Default size is "0:0".

## `<text-line>` Element

Prints its contents as a line of text, with a line feed at the end.

### Attributes

Accepts the same attributes as `<text>`

## `<underline>` Element

Prints its contents underlined.

### Attributes

#### `mode`

Controls the thickness of the line:

`mode=`      | Effect
-------------|-------
`one-point`  | Underline is one dot thick.
`two-points` | Underline is two dots thick (default).

## `<white-mode>` Element

Prints its contents color-inverted (i.e. white on black).
