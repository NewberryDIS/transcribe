


function clamp(value, min, max) {
  return Math.max(Math.min(value, max), min);
}

function hexToRGB(str) {
  var hex = str.replace("#", "");
  var num = parseInt(hex, 16);
  return { r: num >> 16, g: (num >> 8) & 255, b: num & 255 };
};

function rgbToHex({ r, g, b }) {
  return "#" + (b | (g << 8) | (r << 16) | (1 << 24)).toString(16).slice(1);
}

const gammaToLinear = (c) =>
  c >= 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
const linearToGamma = (c) =>
  c >= 0.0031308 ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : 12.92 * c;

function rgbToOklab({ r, g, b }) {
  r = gammaToLinear(r / 255); g = gammaToLinear(g / 255); b = gammaToLinear(b / 255);
  var l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  var m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  var s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  l = Math.cbrt(l); m = Math.cbrt(m); s = Math.cbrt(s);
  return {
    L: l * +0.2104542553 + m * +0.7936177850 + s * -0.0040720468,
    a: l * +1.9779984951 + m * -2.4285922050 + s * +0.4505937099,
    b: l * +0.0259040371 + m * +0.7827717662 + s * -0.8086757660
  }
}

function oklabToSRGB({ L, a, b }) {
  var l = L + a * +0.3963377774 + b * +0.2158037573;
  var m = L + a * -0.1055613458 + b * -0.0638541728;
  var s = L + a * -0.0894841775 + b * -1.2914855480;
  l = l ** 3; m = m ** 3; s = s ** 3;
  var r = l * +4.0767416621 + m * -3.3077115913 + s * +0.2309699292;
  var g = l * -1.2684380046 + m * +2.6097574011 + s * -0.3413193965;
  var b = l * -0.0041960863 + m * -0.7034186147 + s * +1.7076147010;
  r = 255 * linearToGamma(r); g = 255 * linearToGamma(g); b = 255 * linearToGamma(b);
  r = clamp(r, 0, 255); g = clamp(g, 0, 255); b = clamp(b, 0, 255);
  r = Math.round(r); g = Math.round(g); b = Math.round(b);
  return { r, g, b };
}




function getLerpRange(min, max, N) {
  dividend = (max - min) / (N - 1);
  var arr = [];
  currentVal = min;
  for (var i = 0; i < N; i++) {
    arr.push(currentVal);
    currentVal += dividend;
  }
  return arr;
}

function getRGBlerpRangeInOklabSpace(startRGBhexColor, endRGBhexColor, numberOfColors) {
  var lasInterpolaciones = [];
  var startLabVals = rgbToOklab(hexToRGB(startRGBhexColor));
  var endLabVals = rgbToOklab(hexToRGB(endRGBhexColor));
  var lValsArr = getLerpRange(startLabVals.L, endLabVals.L, numberOfColors);
  var aValsArr = getLerpRange(startLabVals.a, endLabVals.a, numberOfColors);
  var bValsArr = getLerpRange(startLabVals.b, endLabVals.b, numberOfColors);
  for (var i = 0; i < numberOfColors; i++) {
    var tmpOklabVals = { L: lValsArr[i], a: aValsArr[i], b: bValsArr[i] };
    var tmpsRGBvals = oklabToSRGB(tmpOklabVals);
    lasInterpolaciones.push(tmpsRGBvals);
  }
  return lasInterpolaciones;
}

testInterpolaciones = getRGBlerpRangeInOklabSpace('#0000ff', '#ffff00', 7);
for (var element of testInterpolaciones) {
  console.log(element);
};

