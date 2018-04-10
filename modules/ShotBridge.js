import { Module } from 'react-vr-web';

class ShotBridge extends Module {
  constructor(rnCtx) {
    super('ShotBridge');
    this.rnCtx = rnCtx;
  }

  setRNCtx(rnCtx) {
    this.rnCtx = rnCtx;
  }

  emitShot() {
    if (this.rnCtx) {
      this.rnCtx.callFunction(
        'RCTDeviceEventEmitter',
        'emit',
        ['shot'],
      );
    }
  }
}

export default ShotBridge;
