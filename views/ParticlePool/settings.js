import * as THREE from 'three';

import SPE from '../../libs/SPE';

const textureLoader = new THREE.TextureLoader();
const explosionImage = '/static_assets/images/sprite-explosion2.png';
const smokeImage = '/static_assets/images/smokeparticle.png';

export default {
  explosion: {
    poolSize: 1,
    settings: {
      texture: {
        value: textureLoader.load(explosionImage),
        frames: new THREE.Vector2(5, 5),
        loop: 1,
      },
      depthTest: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      maxParticleCount: 1500,
      scale: 700,
    },
    emitters: {
      particleCount: 600,
      type: SPE.distributions.SPHERE,
      position: {
        radius: 1,
      },
      maxAge: { value: 0.7 },
      activeMultiplier: 20,
      velocity: {
        value: new THREE.Vector3(1),
      },
      size: { value: 2 },
      color: {
        value: [
          new THREE.Color(0.5, 0.1, 0.05),
          new THREE.Color(0.2, 0.2, 0.2),
        ],
      },
      opacity: { value: [0.5, 0.35, 0.1, 0] },
    },
  },
  smoke: {
    poolSize: 1,
    settings: {
      texture: {
        value: textureLoader.load(smokeImage),
      },
      depthTest: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      maxParticleCount: 1000,
    },
    emitters: [
      {
        particleCount: 600,
        type: SPE.distributions.SPHERE,
        position: {
          radius: 0.1,
        },
        maxAge: {
          value: 0.5,
        },
        activeMultiplier: 20,
        velocity: {
          value: new THREE.Vector3(1.2),
        },
        size: { value: 1.5 },
        opacity: { value: [0.5, 0] },
      },
    ],
  },
};
