// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import { VRInstance } from 'react-vr-web';
import * as SimpleRaycaster from 'simple-raycaster';
import Stats from 'stats.js';

import ShotBridge from '../modules/ShotBridge';

import RCTCustomModel from '../views/CustomModel';
import RCTParticlePool from '../views/ParticlePool';

const enableDevTools = () => {
  const stats = new Stats();

  stats.showPanel(0);
  stats.dom.style.position = 'absolute';
  stats.dom.style.left = '10px';
  stats.dom.style.top = '10px';
  document.body.appendChild(stats.dom);

  return { stats };
};

const init = (bundle, parent, options) => {
  const shotBridge = new ShotBridge();

  const vr = new VRInstance(bundle, 'CannonShooter', parent, {
    raycasters: [
      SimpleRaycaster,
    ],
    nativeModules: [shotBridge],
    cursorVisibility: 'visible',
    customViews: [{
      name: 'CustomModel',
      view: RCTCustomModel,
    }, {
      name: 'ParticlePool',
      view: RCTParticlePool,
    }],
    ...options,
  });

  const { stats } = enableDevTools();

  vr.player.glRenderer.gammaInput = true;
  vr.player.glRenderer.gammaOutput = true;

  shotBridge.setRNCtx(vr.rootView.context);

  vr.render = () => {
    // Any custom behavior you want to perform on each frame goes here
    stats.update();
  };

  // Begin the animation loop
  vr.start();
  return vr;
};

window.ReactVR = { init };
