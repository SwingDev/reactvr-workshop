import React from 'react';
import { Text } from 'react-vr';

import { connect } from 'react-redux';

class HUD extends React.Component {
  render() {
    const { score } = this.props.player;

    return (
      <Text
        style={{
          ...this.props.style,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          fontSize: 0.25,
          fontWeight: '400',
          layoutOrigin: [0.5, 0.5],
          paddingLeft: 0.05,
          paddingRight: 0.05,
          textAlign: 'center',
          textAlignVertical: 'center',
          position: 'absolute',
        }}
      >
        {score}
      </Text>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(mapStateToProps)(HUD);
