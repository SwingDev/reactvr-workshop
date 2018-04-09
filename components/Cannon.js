import React from 'react';
import { View, asset, VrHeadModel } from 'react-vr';

import { CustomModel } from '../views/CustomModel/component';

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

const STYLE = {
  transform: [{
    scale: [0.001, 0.001, 0.001],
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
  };

  componentDidMount() {
    this.listener = RCTDeviceEventEmitter.addListener('onReceivedHeadMatrix', this.handleReceiveMatrix);
  }

  componentWillUnmount() {
    this.listener();
  }

  handleReceiveMatrix = () => {
    const [x, y, z] = VrHeadModel.rotation();

    this.setState({
      headRotateX: getDumped(x),
      headRotateY: getDumped(y),
    });
  };

  render() {
    const { headRotateX, headRotateY } = this.state;

    return (
      <View style={this.props.style}>
        <CustomModel
          source={asset('cannon/cannon_head_separate.gltf')}
          style={{
            transform: [{
              translate: [0, 0.5, 0],
            }, {
              rotateX: headRotateX,
            }, {
              rotateY: headRotateY,
            }, {
              scale: [0.001, 0.001, 0.001],
            }],
          }}
          material={MATERIAL}
        />
        <CustomModel
          source={asset('cannon/cannon_legs_separate.gltf')}
          style={STYLE}
          material={MATERIAL}
        />
      </View>
    );
  }
}

export default Cannon;
