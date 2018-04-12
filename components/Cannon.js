import React from 'react';
import { View, asset, VrHeadModel, Sound } from 'react-vr';

import { CustomModel } from '../views/CustomModel/component';
import HUD from './HUD';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

const MATERIAL = {
  envMap: [
    asset('images/skybox/px.png'),
    asset('images/skybox/nx.png'),
    asset('images/skybox/py.png'),
    asset('images/skybox/ny.png'),
    asset('images/skybox/pz.png'),
    asset('images/skybox/nz.png'),
  ],
};

const MAX_ROTATION_DEGREE = 20;

const CANNON_STYLE = {
  transform: [{
    scale: [0.001, 0.001, 0.001],
  }],
};

const HUD_STYLE = {
  transform: [{
    translate: [-0.5, 0.75, -0.5],
  }],
};

/* eslint-disable no-nested-ternary */
const getDumped = value => (
  (value > MAX_ROTATION_DEGREE)
    ? MAX_ROTATION_DEGREE
    : (value < -MAX_ROTATION_DEGREE)
      ? -MAX_ROTATION_DEGREE
      : value
);
/* eslint-enable no-nested-ternary */

class Cannon extends React.Component {
  state = {
    headRotateX: 0,
    headRotateY: 0,
    soundPlayState: 'pause',
  };

  componentDidMount() {
    this.rotateListener = RCTDeviceEventEmitter.addListener(
      'onReceivedHeadMatrix',
      this.handleReceiveMatrix,
    );

    this.shotListener = RCTDeviceEventEmitter.addListener(
      'shot',
      this.handleShot,
    );
  }

  componentWillUnmount() {
    this.rotateListener();
    this.shotListener();
  }

  handleReceiveMatrix = () => {
    const [x, y] = VrHeadModel.rotation();

    this.setState({
      headRotateX: getDumped(x),
      headRotateY: getDumped(y),
    });
  };

  handleShot = () => {
    this.setState({
      soundPlayState: 'play',
    });
  };

  handleSoundEnd = () => {
    this.setState({
      soundPlayState: 'stop',
    });
  };

  render() {
    const { headRotateX, headRotateY } = this.state;

    return (
      <View style={this.props.style}>
        <View
          style={{
            transform: [{
              translate: [0, 0.5, 0],
            }, {
              rotateX: headRotateX,
            }, {
              rotateY: headRotateY,
            }],
          }}
        >
          <HUD style={HUD_STYLE} />

          <CustomModel
            source={asset('cannon/cannon_head_separate.gltf')}
            style={CANNON_STYLE}
            material={MATERIAL}
          />
        </View>

        <CustomModel
          source={asset('cannon/cannon_legs_separate.gltf')}
          style={CANNON_STYLE}
          material={MATERIAL}
        />

        <Sound
          autoPlay={false}
          source={{
            mp3: asset('cannon-shot.mp3'),
          }}
          playControl={this.state.soundPlayState}
          onEnded={this.handleSoundEnd}
          volume={1}
        />
      </View>
    );
  }
}

export default Cannon;
