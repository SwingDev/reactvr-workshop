import React from 'react';
import * as THREE from 'three';
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
import { ParticlePool } from '../views/ParticlePool/component';
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
    explosionPosition: new THREE.Vector3(0, 0, -5),
    showExplosion: false,
  };

  renderBox = (box) => {
    const {
      id,
      x,
      y,
      file,
    } = box;

    return (
      <VrButton
        key={id}
        onClick={() => this.handleHit(box)}
        onLongClick={() => this.handleHit(box, weapons.ROCKET)}
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
          }}
        />
      </VrButton>
    );
  }

  finishGame() {
    this.props.updateFinishedStatus(true);

    this.setState({
      boxes: getBoxesProps(),
      soundPlayState: 'pause',
    });
  }

  handleHit = (box, weapon = weapons.CANNONBALL) => {
    const { id, x, y } = box;
    const { boxes, explosionPosition } = this.state;

    NativeModules.ShotBridge.emitShot();

    const {
      updatedBoxes,
      boxesToRemove,
    } = getUpdatedBoxes(boxes, id, weapon);

    this.setState({
      boxes: updatedBoxes,
      soundPlayState: 'play',
      explosionPosition: explosionPosition.clone().set(x, y, -5),
      showExplosion: true,
    }, () => this.afterHitUpdate(boxesToRemove));
  };

  afterHitUpdate = (boxesToRemove) => {
    const { boxes } = this.state;

    this.props.addHit(
      getPoints(boxesToRemove),
      boxesToRemove.length,
    );

    this.setState({
      showExplosion: false,
    });

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

    const {
      boxes,
      explosionPosition,
      showExplosion,
      soundPlayState,
    } = this.state;

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
          playControl={soundPlayState}
          onEnded={this.handleSoundEnd}
        />

        <ParticlePool
          type='explosion'
          particlePosition={explosionPosition}
          show={showExplosion}
          style={{
            transform: [{
              translate: [
                explosionPosition.x - 0.25,
                explosionPosition.y + 0.5,
                explosionPosition.z - 1,
              ],
            }],
          }}
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
