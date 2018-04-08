import React from 'react';
import { Plane } from 'react-vr';

import { Y_OFFSET } from '../config';

const Ground = () => (
  <Plane
    dimWidth={500}
    dimHeight={500}
    style={{
      transform: [{
        translateY: -Y_OFFSET,
      }, {
        rotateX: `${-(Math.PI / 2)}rad`,
      }],
    }}
    materialParameters={{
      color: 0xffc880,
      specular: 0x050505,
    }}
    lit
  />
);

export default Ground;
