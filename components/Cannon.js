import React from 'react';
import { View, asset, VrHeadModel } from 'react-vr';

import { CustomModel } from '../views/CustomModel/component';

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

/* eslint-disable no-nested-ternary */
const getClamped = value => (
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

  render() {
    return (
      <View style={this.props.style}>
        <View>
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
      </View>
    );
  }
}

export default Cannon;
