'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _capitalize = require('capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTypeStr(type) {
  if (!type) return '';
  switch (type.name.toLowerCase()) {
    case 'instanceof':
      return 'Class(' + type.value.name + ')';
    case 'oneof':
      return type.value.join('│');
    case 'oneoftype':
      return type.value.map(function (t) {
        return '' + getTypeStr(t);
      }).join('│');
    case 'arrayof':
      return 'Array(' + getTypeStr(type.value) + ')';
    case 'bool':
      return 'Boolean';
    case 'func':
      return 'Function';
    case 'shape':
      var shape = type.value;
      var rst = {};
      shape.forEach(function (prop) {
        rst[prop.name] = getTypeStr(shape[prop.value]);
      });
      return (0, _stringify2.default)(rst);
    default:
      return (0, _capitalize2.default)(type.name);
  }
}

module.exports = getTypeStr;