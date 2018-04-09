import React from 'react';
import { View, VrButton, asset } from 'react-vr';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import { CustomModel } from '../views/CustomModel/component';
import { updateScore } from '../actions/player';

import { BOX_SCALE, BOX_SIZE } from '../config';

export const WALL_WIDTH = 4;
export const WALL_HEIGHT = 4;

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
      });
    }
  }

  return items;
};

class Wall extends React.Component {
  state = {
    boxes: getBoxesProps(),
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
    this.setState(prevState => ({
      boxes: prevState.boxes.filter(box => box.id !== id),
    }), () => {
      this.props.addHit();
    });
  };

  render() {
    return (
      <View style={this.props.style}>
        {this.state.boxes.map(this.renderBox)}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addHit: () => dispatch(updateScore()),
});

export default connect(null, mapDispatchToProps)(Wall);
