import React from 'react';
import { View, asset } from 'react-vr';

import { CustomModel } from '../views/CustomModel/component';

const MATERIAL = {
  color: '#ffffff',
  map: asset('cannon-obj/turret_unit/DefaultMaterial_baseColor.png'),
  normalMap: asset('cannon-obj/turret_unit/DefaultMaterial_normal.png'),
  metalnessMap: asset('cannon-obj/turret_unit/DefaultMaterial_occlusionRoughnessMetallic.png'),
  roughnessMap: asset('cannon-obj/turret_unit/DefaultMaterial_occlusionRoughnessMetallic.png'),
  aoMap: asset('cannon-obj/turret_unit/DefaultMaterial_occlusionRoughnessMetallic.png'),
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
          source={asset('cannon-obj/turret_head.obj')}
          style={STYLE}
          material={MATERIAL}
        />
        <CustomModel
          source={asset('cannon-obj/turret_legs.obj')}
          style={STYLE}
          material={MATERIAL}
        />
      </View>
    );
  }
}

export default Cannon;
