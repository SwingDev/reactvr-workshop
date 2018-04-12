import React from 'react';
import { View, VrButton, Sound, asset, NativeModules } from 'react-vr';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import {
  BOX_SCALE,
  BOX_SIZE,
  WALL_WIDTH,
  WALL_HEIGHT,
  SPECIAL_WEAPON_DELAY,
  weapons,
} from '../config';

import { CustomModel } from '../views/CustomModel/component';
import { updateScore, setFinishedStatus } from '../actions/player';
import { getUpdatedBoxes, getRandomBoxType } from '../utils/box-helpers';
import Summary from './Summary';

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

const SUMMARY_STYLE = {
  transform: [{
    translate: [3, 3, -5],
  }],
};

const getBoxesProps = () => {
  const items = [];

  for (let i = 0; i < WALL_WIDTH; i += 1) {
    for (let j = 0; j < WALL_HEIGHT; j += 1) {
      const boxType = getRandomBoxType();

      items.push({
        id: uuid(),
        x: i * BOX_SIZE * BOX_SCALE,
        y: j * BOX_SIZE * BOX_SCALE,
        points: boxType.points,
        file: boxType.file,
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

  renderBox = ({
    id,
    x,
    y,
    file,
  }) => (
    <VrButton
      key={id}
      onClick={() => this.handleHit(id)}
      onLongClick={() => this.handleHit(id, weapons.ROCKET)}
      longClickDelayMS={SPECIAL_WEAPON_DELAY}
    >
      <CustomModel
        source={asset(file || 'box/box.gltf')}
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

  finishGame() {
    this.props.updateFinishedStatus(true);

    this.setState({
      boxes: getBoxesProps(),
      soundPlayState: 'pause',
    });
  }

  handleHit = (id, weapon = weapons.CANNONBALL) => {
    const { boxes } = this.state;

    NativeModules.ShotBridge.emitShot();

    const {
      updatedBoxes,
      boxesToRemove,
    } = getUpdatedBoxes(boxes, id, weapon);

    this.setState({
      boxes: updatedBoxes,
      soundPlayState: 'play',
    }, () => this.afterHitUpdate(boxesToRemove));
  };

  afterHitUpdate = (boxesToRemove) => {
    const { boxes } = this.state;

    this.props.addHit(
      getPoints(boxesToRemove),
      boxesToRemove.length,
    );

    if (boxes.length === 0) {
      this.finishGame();
    }
  };

  handleSoundEnd = () => {
    this.setState({
      soundPlayState: 'stop',
    });
  };

  render() {
    const { hasFinished } = this.props.player;
    const { boxes } = this.state;

    return (
      <View style={this.props.style}>
        {(!hasFinished) ? (
          boxes.map(this.renderBox)
        ) : (
          <Summary style={SUMMARY_STYLE} />
        )}

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
  updateFinishedStatus: hasFinished => dispatch(setFinishedStatus(hasFinished)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wall);
