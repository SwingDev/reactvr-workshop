import React from 'react';

import {
  View,
  AmbientLight,
  DirectionalLight,
} from 'react-vr';

import { Y_OFFSET, BOX_SIZE, WALL_WIDTH } from '../config';

import Sky from './Sky';
import Ground from './Ground';
import Cannon from './Cannon';
import Wall from './Wall';

const WALL_STYLE = {
  transform: [{
    translate: [
      -WALL_WIDTH + (BOX_SIZE / 2),
      -Y_OFFSET,
      -5,
    ],
  }],
};

const CANNON_STYLE = {
  transform: [{
    translate: [0, -Y_OFFSET + 0.65, -2],
  }],
};

class App extends React.Component {
  render() {
    return (
      <View>
        <AmbientLight intensity={0.4} />
        <DirectionalLight />

        <Sky />
        <Ground />

        <Wall style={WALL_STYLE} />
        <Cannon style={CANNON_STYLE} />
      </View>
    );
  }
}

export default App;
