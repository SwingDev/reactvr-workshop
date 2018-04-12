import React from 'react';
import { Text, View, VrButton } from 'react-vr';

import { connect } from 'react-redux';

import { setFinishedStatus } from '../actions/player';

const ROOT_STYLE = {
  position: 'absolute',
  layoutOrigin: [0.5, 0.5],
  padding: 0.3,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
};

const TEXT_STYLE = {
  fontSize: 0.8,
  fontWeight: '400',
  paddingLeft: 0.2,
  paddingRight: 0.2,
  textAlignVertical: 'center',
};

const BUTTON_STYLE = {
  backgroundColor: '#5f27cd',
  fontSize: 0.8,
  fontWeight: '400',
  paddingLeft: 0.2,
  paddingRight: 0.2,
  marginTop: 0.3,
  textAlign: 'center',
  textAlignVertical: 'center',
};

class Summary extends React.Component {
  render() {
    const { score, hits } = this.props.player;

    return (
      <View style={{ ...this.props.style, ...ROOT_STYLE }}>
        <Text style={TEXT_STYLE}>
          Your points: {score}
        </Text>

        <Text style={TEXT_STYLE}>
          Your hits: {hits}
        </Text>

        <Text style={TEXT_STYLE}>
          Your time: 0
        </Text>

        <VrButton onClick={() => this.props.updateFinishedStatus(false)}>
          <Text style={BUTTON_STYLE}>
            Restart game
          </Text>
        </VrButton>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
});

const mapDispatchToProps = dispatch => ({
  updateFinishedStatus: hasFinished => dispatch(setFinishedStatus(hasFinished)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
