import PropTypes from 'prop-types';
import React, { Component } from 'react';

class LogoutLink extends Component {
  static get propTypes() {
    return {
      className: PropTypes.string,
    };
  }

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit() {
    this.refs.form.submit();
  }

  render() {
    return (
      <form acceptCharset="UTF-8" action="/logout" method="post" ref="form">
        <input name="_utf8" type="hidden" value="✓" />
        <input
          type="hidden"
          name="_csrf_token"
          value={window.LEATHER.csrfToken}
        />
        <input type="hidden" name="_method" value="delete" />
        <a className={this.props.className} onClick={this.submit}>
          Log out
        </a>
      </form>
    );
  }
}

export default LogoutLink;
