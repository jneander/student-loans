'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _registry = require('../../themeable/registry');

var _borders = require('./borders');

var _borders2 = _interopRequireDefault(_borders);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _a11y = require('./a11y');

var _a11y2 = _interopRequireDefault(_a11y);

var _typography = require('./typography');

var _typography2 = _interopRequireDefault(_typography);

var _spacing = require('./spacing');

var _spacing2 = _interopRequireDefault(_spacing);

var _forms = require('./forms');

var _forms2 = _interopRequireDefault(_forms);

var _media = require('./media');

var _media2 = _interopRequireDefault(_media);

var _breakpoints = require('./breakpoints');

var _breakpoints2 = _interopRequireDefault(_breakpoints);

var _shadows = require('./shadows');

var _shadows2 = _interopRequireDefault(_shadows);

var _stacking = require('./stacking');

var _stacking2 = _interopRequireDefault(_stacking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var theme = {
  borders: _borders2.default,
  colors: _colors2.default,
  typography: _typography2.default,
  spacing: _spacing2.default,
  forms: _forms2.default,
  media: _media2.default,
  breakpoints: _breakpoints2.default,
  shadows: _shadows2.default,
  stacking: _stacking2.default,

  /* Begin defaults for Canvas account branding variables: */
  'ic-brand-primary': _colors2.default.brand,
  'ic-brand-font-color-dark': _colors2.default.licorice,

  'ic-link-color': _colors2.default.brand,

  'ic-brand-button--primary-bgd': _colors2.default.brand,
  'ic-brand-button--primary-text': _colors2.default.white,
  'ic-brand-button--secondary-bgd': _colors2.default.licorice,
  'ic-brand-button--secondary-text': _colors2.default.white
};

(0, _registry.registerTheme)('canvas', theme);
(0, _registry.registerTheme)('canvas-a11y', Object.assign({}, theme, _a11y2.default));
(0, _registry.registerTheme)('a11y', Object.assign({}, theme, _a11y2.default)); // TODO: remove this

exports.default = theme;