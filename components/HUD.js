import React from 'react';
import { Text } from 'react-vr';

import { connect } from 'react-redux';

class HUD extends React.Component {
  render() {
    const { score } = this.props.player;

    return (
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(mapStateToProps)(HUD);
