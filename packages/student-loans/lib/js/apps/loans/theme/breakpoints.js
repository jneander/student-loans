'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var onePixel = 0.0625;
var breakpoints = {
  phone: 30, // 480px
  tablet: 48, // 768px
  desktop: 62, // 992px
  wide: 75 // 1200px
};

exports.default = Object.freeze({
  phone: breakpoints.phone + 'em',
  tablet: breakpoints.tablet + 'em',
  desktop: breakpoints.desktop + 'em',
  wide: breakpoints.wide + 'em',

  maxWidth: breakpoints.desktop - onePixel + 'em'
});