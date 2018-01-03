import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initChannel } from '../actions/channels';
import { linkExchangeToken } from '../actions/link';
import { plaidItemAdded, setPlaidItems } from '../actions/plaidItems';
import { selectActivePanel } from '../selectors/panels';
import { selectAllPlaidItems } from '../selectors/plaidItems';
import { selectChannelByName } from '../selectors/channels';
import { setActivePanel } from '../actions/panels';

const mapDispatchToProps = {
  initChannel,
  linkExchangeToken,
  plaidItemAdded,
  setActivePanel,
  setPlaidItems,
};

const mapStateToProps = state => {
  return {
    activePanel: selectActivePanel(state),
    channel: selectChannelByName(state, `link:${window.LEATHER.user.id}`),
    plaidItems: selectAllPlaidItems(state),
  };
};

class LinkContainer extends Component {
  static get propTypes() {
    return {
      activePanel: PropTypes.string,
      initChannel: PropTypes.func,
      setActivePanel: PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
    this.startLinking = this.startLinking.bind(this);
    this.state = {
      plaidHandler: Plaid.create({
        clientName: 'Leather',
        env: 'sandbox',
        key: window.LEATHER.plaidPublicKey,
        product: ['transactions'],
        onSuccess: (publicToken, metadata) => {
          this.props.linkExchangeToken(
            this.props.channel,
            publicToken,
            metadata
          );
        },
      }),
    };
  }

  componentWillMount() {
    this.maybeInitChannel(this.props);
    this.props.setActivePanel('link');
  }

  componentWillReceiveProps(props) {
    this.maybeInitChannel(props);
    if (props.activePanel !== 'link') {
      props.setActivePanel('link');
    }
  }

  componentWillUnmount() {
    this.props.setActivePanel(null);
  }

  maybeInitChannel(props) {
    const { channel } = props;

    if (!channel) {
      props.initChannel(`link:${window.LEATHER.user.id}`);
    }

    if (channel && channel.state === 'closed') {
      channel.join().receive('ok', ({ plaid_items: plaidItems }) => {
        props.setPlaidItems(plaidItems);
      });
      channel.on('plaid_item_added', plaidItem => {
        props.plaidItemAdded(plaidItem);
      });
    }
  }

  startLinking() {
    this.state.plaidHandler.open();
  }

  render() {
    const { plaidItems } = this.props;
    return (
      <div className="column">
        <section className="section">
          <h5 className="subtitle">
            Link your bank account with Leather and automatically import
            transactions.
          </h5>
          <p>
            <a
              className="button is-primary"
              id="link-button"
              onClick={this.startLinking}
            >
              Link Account to Leather{''}
              <span className="icon" style={{ marginLeft: '0.2em' }}>
                <i className="fa fa-arrow-circle-o-right" />
              </span>
            </a>
          </p>
          <nav className="panel" style={{ marginTop: '3rem' }}>
            <p className="panel-heading">Linked Accounts</p>
            {plaidItems.map(plaidItem => {
              return (
                <div
                  className="panel-block"
                  key={plaidItem.get('id')}
                  style={{ alignItems: 'normal', flexDirection: 'column' }}
                >
                  <div style={{ alignItems: 'center', display: 'flex' }}>
                    <span className="panel-icon">
                      <i className="fa fa-bank" />
                    </span>
                    {plaidItem.get('institution_name')}
                  </div>
                  <ul style={{ marginLeft: '26px' }}>
                    <li>...retrieving accounts (this may take a bit)</li>
                  </ul>
                </div>
              );
            })}
          </nav>
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkContainer);
