import capitalize from 'capitalize';

function getTypeStr(type) {
  if (!type) return '';
  switch (type.name.toLowerCase()) {
    case 'instanceof':
      return `Class(${type.value.name})`;
    case 'oneof':
      return type.value.join('│');
    case 'oneoftype':
      return type.value.map(t => `${getTypeStr(t)}`).join('│');
    case 'arrayof':
      return `Array(${getTypeStr(type.value)})`;
    case 'bool':
      return 'Boolean';
    case 'func':
      return 'Function';
    case 'shape':
      let shape = type.value;
      let rst = {};
      shape.forEach(prop => {
        rst[prop.name] = getTypeStr(shape[prop.value]);
      });
      return JSON.stringify(rst);
    default:
      return capitalize(type.name);
  }
}

module.exports = getTypeStr;
