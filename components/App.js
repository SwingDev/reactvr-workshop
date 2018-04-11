import React from 'react';

import {
  View,
  AmbientLight,
  DirectionalLight,
} from 'react-vr';

import { Y_OFFSET, BOX_SIZE, WALL_WIDTH } from '../config';
import { HemiLight } from '../views/HemiLight/component';

import Sky from './Sky';
import Ground from './Ground';
import Cannon from './Cannon';
import Score from './Score';
import Wall from './Wall';

class App extends React.Component {
  render() {
    return (
      <View>
        <AmbientLight intensity={0.3} />
        <DirectionalLight />
        {/* <HemiLight
          style={{
            transform: [{
              translateY: 30,
            }],
            color: 0x3284ff,
          }}
          intensity={0.6}
          skyColor={0x3284ff}
        /> */}

        <Sky />
        <Ground />

        <Wall
          style={{
            transform: [{
              translate: [
                -WALL_WIDTH + (BOX_SIZE / 2),
                -Y_OFFSET + (BOX_SIZE / 2),
                -3,
              ],
            }],
          }}
        />

        <Cannon
          style={{
            transform: [{
              translate: [0, -Y_OFFSET + 0.65, -2],
            }],
          }}
        />

        <Score
          style={{
            transform: [{
              translate: [-6, 0, -10],
            }],
          }}
        />
      </View>
    );
  }
}

export default App;
