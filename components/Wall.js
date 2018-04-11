import React from 'react';
import { View, VrButton, Sound, asset, NativeModules } from 'react-vr';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import { CustomModel } from '../views/CustomModel/component';
import { updateScore } from '../actions/player';
import { getUpdatedBoxes } from '../utils/box-helpers';

import {
  BOX_SCALE,
  BOX_SIZE,
  WALL_WIDTH,
  WALL_HEIGHT,
} from '../config';

const BOX_MATERIAL = {
  envMap: [
    asset('images/skybox/px.png'),
    asset('images/skybox/nx.png'),
    asset('images/skybox/py.png'),
    asset('images/skybox/ny.png'),
    asset('images/skybox/pz.png'),
    asset('images/skybox/nz.png'),
  ],
};

const getBoxesProps = () => {
  const items = [];

  for (let i = 0; i < WALL_WIDTH; i += 1) {
    for (let j = 0; j < WALL_HEIGHT; j += 1) {
      items.push({
        id: uuid(),
        x: i * BOX_SIZE * BOX_SCALE,
        y: j * BOX_SIZE * BOX_SCALE,
        points: 1,
      });
    }
  }

  return items;
};

const getPoints = boxes => (
  boxes.reduce((sum, box) => (sum + box.points), 0)
);

class Wall extends React.Component {
  state = {
    boxes: getBoxesProps(),
    soundPlayState: 'pause',
  };

  renderBox = ({ id, x, y }) => (
    <VrButton
      key={id}
      onClick={() => this.handleHit(id)}
    >
      <CustomModel
        source={asset('box/box.gltf')}
        material={BOX_MATERIAL}
        style={{
          transform: [{
            translate: [x, y, 0],
          }, {
            scale: [0.03, 0.03, 0.03],
          }],
          position: 'absolute',
        }}
      />
    </VrButton>
  );

  handleHit = (id) => {
    const { boxes } = this.state;
    const { weapon } = this.props.player;

    NativeModules.ShotBridge.emitShot();

    const {
      updatedBoxes,
      boxesToRemove,
    } = getUpdatedBoxes(boxes, id, weapon);

    this.setState({
      boxes: updatedBoxes,
      soundPlayState: 'play',
    }, () => {
      this.props.addHit(getPoints(boxesToRemove));
    });
  };

  handleSoundEnd = () => {
    this.setState({
      soundPlayState: 'stop',
    });
  };

  render() {
    return (
      <View style={this.props.style}>
        {this.state.boxes.map(this.renderBox)}

        <Sound
          autoPlay={false}
          source={{
            mp3: asset('box-explosion.mp3'),
          }}
          playControl={this.state.soundPlayState}
          onEnded={this.handleSoundEnd}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
});

const mapDispatchToProps = dispatch => ({
  addHit: (points = 1) => dispatch(updateScore(points)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wall);
