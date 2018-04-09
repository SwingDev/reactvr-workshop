import React from 'react';
import { View, asset } from 'react-vr';

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

const STYLE = {
  transform: [{
    scale: [0.001, 0.001, 0.001],
  }],
};

class Cannon extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        <CustomModel
          source={asset('cannon/cannon_head_separate.gltf')}
          style={{
            transform: [{
              translate: [0, 0.5, 0],
            }, {
              rotateY: -45,
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
