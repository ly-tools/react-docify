'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = function (content) {
  var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var userConfig = (0, _extends3.default)({}, DEFAULT_CONFIG, config);
  var descObj = (0, _reactDocer2.default)(content);
  typeof userConfig.beforeHook === 'function' && userConfig.beforeHook(descObj);
  (descObj.classes || []).forEach(function (cla) {
    cla.methods = cla.methods.filter(function (method) {
      return !shouldExclude(method.name, userConfig.excludeMethods);
    });
    cla.propertiesTable = (0, _markdownTableify2.default)(cla.properties.filter(function (prop) {
      return !shouldExclude(prop.name, userConfig.excludeProperties);
    }).map(function (prop) {
      return (0, _extends3.default)({}, prop, {
        value: prop.value.replace('\n', ''),
        'static': prop.static ? '√' : '×'
      });
    }), {
      headers: userConfig.propertiesHeaders
    });
    cla.propTypesTable = (0, _markdownTableify2.default)((cla.propTypes || []).map(function (propType) {
      return (0, _extends3.default)({}, propType, {
        defaultValue: propType.defaultValue ? '`' + propType.defaultValue + '`' : '',
        type: (0, _humanize2.default)(propType.type),
        required: propType.required ? '√' : '×'
      });
    }), {
      headers: userConfig.propTypesHeaders
    });
  });
  return (0, _lodash.template)(userConfig.template)((0, _extends3.default)({
    dependencies: [],
    classes: []
  }, descObj));
};

var _reactDocer = require('react-docer');

var _reactDocer2 = _interopRequireDefault(_reactDocer);

var _markdownTableify = require('markdown-tableify');

var _markdownTableify2 = _interopRequireDefault(_markdownTableify);

var _lodash = require('lodash');

var _humanize = require('./humanize');

var _humanize2 = _interopRequireDefault(_humanize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shouldExclude(str, rules) {
  for (var i = rules.length; i--;) {
    var rule = rules[i];
    if (typeof rule === 'string' && rule === str) return true;else if (typeof rule === 'function' && rule(str)) return true;else if ((0, _lodash.isRegExp)(rule) && rule.test(str)) return true;
  }
  return false;
}

var DEFAULT_EXCLUDE_PROPERTIES = ['propTypes', 'defaultProps', 'displayName', /^_/];

var DEFAULT_EXCLUDE_METHODS = ['constructor', 'render', 'componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount', /^_/];

var DEFAULT_PROP_TYEPS_HEADERS = [{
  name: 'name',
  align: ':---',
  title: 'Name'
}, {
  name: 'description',
  align: ':-----',
  title: 'Description'
}, {
  name: 'type',
  align: ':---',
  title: 'Type'
}, {
  name: 'required',
  align: ':---:',
  title: 'Required'
}, {
  name: 'defaultValue',
  align: ':---:',
  title: 'Default Value'
}];

var DEFAULT_PROPERTIES_HEADERS = [{
  name: 'name',
  align: ':---',
  title: 'Name'
}, {
  name: 'description',
  align: ':-----',
  title: 'Description'
}, {
  name: 'static',
  align: ':--:',
  title: 'Static'
}, {
  name: 'value',
  align: ':---',
  title: 'Value'
}];

var DEFAULT_TEMPLATE = '\n\n<% if(dependencies && dependencies.length) {%>\n## Dependencies\n<% _.forEach(dependencies || [], function(dep) { %>\n* <%= dep %><%  }); %><%}%>\n\n<% _.forEach(classes || [], function(cla) { %>\n## Class::<%= cla.name %>\n\n<% if(cla.displayName) {%>Display Name: <%= cla.displayName %><% } %>\n\n<% if(cla.superClass) {%>SuperClass Name: <%= cla.superClass %><% } %>\n\n<% if(cla.methods && cla.methods.length) {%>\n### Methods\n<% _.forEach(cla.methods, function(method) { %>\n* <%= method.name %>(<%= method.params.join(\', \') %>): <%= method.description %><% }); %>\n<%}%>\n<% if(cla.properties && cla.properties.length) {%>\n### Class Properties\n\n<%= cla.propertiesTable %>\n<%}%>\n<% if(cla.propTypes && cla.propTypes.length) {%>\n### PropTypes\n\n<%= cla.propTypesTable %>\n<%}%>\n<% }); %>\n';

var DEFAULT_CONFIG = {
  template: DEFAULT_TEMPLATE,
  excludeProperties: DEFAULT_EXCLUDE_PROPERTIES,
  excludeMethods: DEFAULT_EXCLUDE_METHODS,
  propTypesHeaders: DEFAULT_PROP_TYEPS_HEADERS,
  propertiesHeaders: DEFAULT_PROPERTIES_HEADERS,
  beforeHook: function beforeHook() {}
};

module.exports = exports['default'];