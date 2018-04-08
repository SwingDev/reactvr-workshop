import * as ReactVR from 'react-vr-web';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';

import merge from 'react-vr-web/js/Utils/merge';

class RCTHemiLight extends ReactVR.RCTBaseView {
  constructor(guiSys) {
    super();

    const light = new THREE.HemisphereLight();
    this.view = new OVRUI.UIView(guiSys);
    this.view.add(light);

    Object.defineProperty(
      this.props,
      'intensity',
      ({
        set: (value) => {
          light.intensity = value;
        },
      }),
    );

    Object.defineProperty(
      this.props,
      'skyColor',
      ({
        set: (value) => {
          light.skyColor = value;
        },
      }),
    );

    Object.defineProperty(
      this.props,
      'groundColor',
      ({
        set: (value) => {
          light.groundColor = value;
        },
      }),
    );

    Object.defineProperty(
      this.style,
      'color',
      ({
        set: (value) => {
          light.color.set(value);
        },
      }),
    );

    this.props.intensity = 1;
    this.props.skyColor = 0xffffff;
    this.props.groundColor = 0xffffff;
  }

  static describe() {
    return merge(super.describe(), {
      // declare the native props sent from react to runtime
      NativeProps: {
        intensity: 'number',
        skyColor: 'string',
        groundColor: 'string',
      },
    });
  }
}

export default RCTHemiLight;
