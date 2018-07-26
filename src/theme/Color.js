const formatNumber = (number, format) => {
  if (format === 10) {
    return number;
  } else if (format === 'percent') {
    return Math.round((number / 255) * 1000) / 1000;
  }
  throw new Error('Format is invalid.');
};

const parseRGBA = (color) => {
  let r = 1;
  let g = 1;
  let b = 1;
  let a = 1;

  if (typeof color === 'string' && color.match(/^rgb\(\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i)) {
    const matches = color.match(/rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    r = matches[1];
    g = matches[2];
    b = matches[3];
  } else if (typeof color === 'string' && color.match(/^rgba\(\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0\.\d+)\s*\)$/i)) {
    const matches = color.match(/rgba\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(0|1|0\.\d+)\s*\)/i);
    r = matches[1];
    g = matches[2];
    b = matches[3];
    a = matches[4];
  }

  if (r === undefined || g === undefined || b === undefined || a === undefined) {
    throw new Error('Not a rgba string.');
  }

  r = parseInt(r, 10);
  g = parseInt(g, 10);
  b = parseInt(b, 10);
  a = parseFloat(a) * 255;

  return { red: r, green: g, blue: b, alpha: a };
};

const parseHex = (color) => {
  if (!color.match(/^#([0-9a-f]{6}|[0-9a-f]{8})$/i)) {
    throw new Error('Not a hex string.');
  }

  const formattedColor = color.replace(/^#/, '');

  const convert = single => (parseInt(single, 16));
  const r = convert(formattedColor.substr(0, 2));
  const g = convert(formattedColor.substr(2, 2));
  const b = convert(formattedColor.substr(4, 2));
  const a = convert(formattedColor.substr(6, 2) || 'FF');

  return { red: r, green: g, blue: b, alpha: a };
};

class Color {
  constructor(color) {
    this.channel = undefined;
    this.initChannel(color);
  }

  initChannel(color) {
    if (!this.channel) {
      try {
        this.channel = parseHex(color);
      } catch (e) {
        // error
      }
    }
    if (!this.channel) {
      try {
        this.channel = parseRGBA(color);
      } catch (e) {
        // error
      }
    }
    if (!this.channel) {
      throw new Error("Can't parse color.");
    }
  }

  getRed = () => formatNumber(this.channel.red, 10);

  getGreen = () => formatNumber(this.channel.green, 10);

  getBlue = () => formatNumber(this.channel.blue, 10);

  getAlpha = () => formatNumber(this.channel.alpha, 'percent');

  toFormat = (format) => {
    if (!(typeof format === 'string')) {
      throw new Error('Format must be a string.');
    }

    return format
      .replace(/\$r/i, this.getRed())
      .replace(/\$g/i, this.getGreen())
      .replace(/\$b/i, this.getBlue())
      .replace(/\$a/i, this.getAlpha());
  };

  opacity = value => this.toFormat(`rgba($r, $g, $b, ${value})`);
}

export default Color;
