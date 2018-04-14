import * as ReactVR from 'react-vr-web';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';

import merge from 'react-vr-web/js/Utils/merge';

import SPE from '../../libs/SPE';

import poolSettings from './settings';

const clock = new THREE.Clock();

class RCTParticlePool extends ReactVR.RCTBaseView {
  constructor(guiSys) {
    super();

    this.view = new OVRUI.UIView(guiSys);

    Object.defineProperty(
      this.props,
      'type',
      ({
        set: this.setType,
      }),
    );

    Object.defineProperty(
      this.props,
      'show',
      ({
        set: this.setShow,
      }),
    );
  }

  setType = (value) => {
    if (value) {
      const { settings, poolSize, emitters } = poolSettings[value];
      this.group = new SPE.Group(settings);
      this.view.add(this.group.mesh);

      this.group.mesh.raycast = () => {};
      this.view.raycast = () => {};

      this.group.mesh.frustumCulled = false;

      this.group.addPool(poolSize, emitters, false);
    }
  };

  setShow = (value) => {
    if (value && this.group) {
      this.group.triggerPoolEmitter(1);
    }
  };

  frame(...args) {
    super.frame(...args);

    if (this.group) {
      this.group.tick(clock.getDelta());
    }
  }

  static describe() {
    return merge(super.describe(), {
      // declare the native props sent from react to runtime
      NativeProps: {
        type: 'string',
        show: 'boolean',
      },
    });
  }
}

export default RCTParticlePool;
