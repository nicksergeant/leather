import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initChannel } from '../actions/channels';
import { selectActivePanel } from '../selectors/panels';
import { setActivePanel } from '../actions/panels';

const mapDispatchToProps = {
  setActivePanel,
};

const mapStateToProps = state => {
  return {
    activePanel: selectActivePanel(state),
  };
};

class LinkContainer extends Component {
  static get propTypes() {
    return {
      activePanel: PropTypes.string,
      setActivePanel: PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
    this.startLinking = this.startLinking.bind(this);
    this.state = {
      plaidHandler: Plaid.create({
        clientName: 'Plaid Walkthrough Demo',
        env: 'sandbox',
        key: window.LEATHER.plaidPublicKey,
        product: ['transactions'],
        webhook: '...',
        onSuccess: function(public_token, metadata) {
          console.log(public_token, metadata);
        },
      }),
    };
  }

  componentWillMount() {
    this.props.setActivePanel('link');
  }

  componentWillReceiveProps(props) {
    if (props.activePanel !== 'link') {
      props.setActivePanel('link');
    }
  }

  componentWillUnmount() {
    this.props.setActivePanel(null);
  }

  startLinking() {
    this.state.plaidHandler.open();
  }

  render() {
    return (
      <div className="column">
        <section className="section">
          <h5 className="subtitle">
            Link your bank account with Leather and automatically import
            transactions.
          </h5>
          <p>
            <a className="button is-primary" id="link-button" onClick={this.startLinking}>
              Link Account to Leather{''}
              <span className="icon" style={{ marginLeft: '0.2em' }}>
                <i className="fa fa-arrow-circle-o-right" />
              </span>
            </a>
          </p>
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkContainer);
