'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _breakpoints = require('./breakpoints');

var _breakpoints2 = _interopRequireDefault(_breakpoints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Object.freeze({
  tabletMin: 'min-width: ' + _breakpoints2.default.tablet,
  desktopMin: 'min-width: ' + _breakpoints2.default.desktop,
  wideMin: 'min-width: ' + _breakpoints2.default.wide
});