import React from 'react';

import {
  View,
  AmbientLight,
  DirectionalLight,
} from 'react-vr';

import { Y_OFFSET, BOX_SIZE, WALL_WIDTH } from '../config';

import Sky from './Sky';
import Ground from './Ground';

const WALL_STYLE = {
  transform: [{
    translate: [
      -WALL_WIDTH + (BOX_SIZE / 2) + 0.25,
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
      </View>
    );
  }
}

export default App;
