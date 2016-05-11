'use strict';
const React = require('react');
/**
 * class description
 */
class Component extends React.Component {
  /**
   * Description of propTypes
   */
  static propTypes = {
    /**
     * Description of optionalNumber.
     */
    optionalNumber: React.PropTypes.number
  }
  /**
   * Description of displayName
   */
  static displayName = 'Component'
  /**
   * Description of defaultProps
   */
  static defaultProps = {
    optionalNumber: 123
  }
  /**
   * Description of someStaticProps
   */
  static someStaticProps = 'asdf'
  /**
   * constructor description
   */
  constructor() {
    super();
  }
  /**
   * handle event description
   */
  _handleEvent() {}
  /**
   * get value description
   */
  getValue() {

  }
  /**
   * set value description
   */
  setValue(value, config) {

  }
  /**
   * render description
   */
  render() {
    return (
      <div></div>
    );
  }
}
module.exports = Component;
