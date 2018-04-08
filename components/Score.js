import React from 'react';
import { Text } from 'react-vr';

import { connect } from 'react-redux';

class Score extends React.Component {
  render() {
    const { score } = this.props.player;

    return (
      <Text
        style={{
          ...this.props.style,
          backgroundColor: '#777879',
          fontSize: 0.8,
          fontWeight: '400',
          layoutOrigin: [0.5, 0.5],
          paddingLeft: 0.2,
          paddingRight: 0.2,
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

export default connect(mapStateToProps)(Score);
