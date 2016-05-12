import docer from 'react-docer';
import tableify from 'markdown-tableify';
import {
  template,
  isRegExp
} from 'lodash';
import humanize from './humanize';

function shouldExclude(str, rules) {
  for(let i = rules.length; i--;) {
    let rule = rules[i];
    if (typeof rule === 'string' && rule === str) return true;
    else if (typeof rule === 'function' && rule(str)) return true;
    else if (isRegExp(rule) && rule.test(str)) return true;
  }
  return false;
}

const DEFAULT_EXCLUDE_PROPERTIES = [
  'propTypes',
  'defaultProps',
  'displayName',
  /^_/
];

const DEFAULT_EXCLUDE_METHODS = [
  'constructor',
  'render',
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
  /^_/
];

const DEFAULT_PROP_TYEPS_HEADERS = [{
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

const DEFAULT_PROPERTIES_HEADERS = [{
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

const DEFAULT_TEMPLATE = `

<% if(dependencies && dependencies.length) {%>
## Dependencies
<% _.forEach(dependencies || [], function(dep) { %>
* <%= dep %><%  }); %><%}%>

<% _.forEach(classes || [], function(cla) { %>
## Class::<%= cla.name %>

<% if(cla.displayName) {%>Display Name: <%= cla.displayName %><% } %>

<% if(cla.superClass) {%>SuperClass Name: <%= cla.superClass %><% } %>

<% if(cla.methods && cla.methods.length) {%>
### Methods
<% _.forEach(cla.methods, function(method) { %>
* <%= method.name %>(<%= method.params.join(', ') %>): <%= method.description %><% }); %>
<%}%>
<% if(cla.properties && cla.properties.length) {%>
### Class Properties

<%= cla.propertiesTable %>
<%}%>
<% if(cla.propTypes && cla.propTypes.length) {%>
### PropTypes

<%= cla.propTypesTable %>
<%}%>
<% }); %>
`;

const DEFAULT_CONFIG = {
  template: DEFAULT_TEMPLATE,
  excludeProperties: DEFAULT_EXCLUDE_PROPERTIES,
  excludeMethods: DEFAULT_EXCLUDE_METHODS,
  propTypesHeaders: DEFAULT_PROP_TYEPS_HEADERS,
  propertiesHeaders: DEFAULT_PROPERTIES_HEADERS,
  beforeHook: () => {}
};

export default function(content, config = {}) {
  const userConfig = {
    ...DEFAULT_CONFIG,
    ...config
  };
  const descObj = docer(content);
  typeof userConfig.beforeHook === 'function' && userConfig.beforeHook(descObj);
  (descObj.classes || []).forEach(cla => {
    cla.methods = cla.methods.filter(method => !shouldExclude(method.name, userConfig.excludeMethods));
    cla.propertiesTable = tableify(cla.properties.filter(prop => !shouldExclude(prop.name, userConfig.excludeProperties)).map(prop => ({
      ...prop,
      value: prop.value.replace('\n', ''),
      'static': prop.static ? '√' : '×'
    })), {
      headers: userConfig.propertiesHeaders
    });
    cla.propTypesTable = tableify((cla.propTypes || []).map(propType => ({
      ...propType,
      defaultValue: propType.defaultValue ? `\`${propType.defaultValue}\`` : '',
      type: humanize(propType.type),
      required: propType.required ? '√' : '×'
    })), {
      headers: userConfig.propTypesHeaders
    });
  });
  return template(userConfig.template)({
    dependencies: [],
    classes: [],
    ...descObj
  });
}
