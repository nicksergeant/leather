import React, { Component } from 'react';

class LogoutButton extends Component {
  render() {
    return (
      <form acceptCharset="UTF-8" action="/logout" method="post">
        <input name="_utf8" type="hidden" value="✓" />
        <input type="hidden" name="_csrf_token" value={window.csrfToken} />
        <input type="hidden" name="_method" value="delete" />
        <button className="button" style={{ marginTop: '10px' }} type="submit">
          Log out
        </button>
      </form>
    );
  }
}

export default LogoutButton;
