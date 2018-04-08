import * as ReactVR from 'react-vr-web';
import * as OVRUI from 'ovrui';

import merge from 'react-vr-web/js/Utils/merge';

import { createModelInstance } from './loader';

class RCTCustomModel extends ReactVR.RCTBaseView {
  constructor(guiSys) {
    super();
    this.view = new OVRUI.UIView(guiSys);

    Object.defineProperty(
      this.props,
      'source',
      {
        set: this.setSource,
      },
    );

    Object.defineProperty(
      this.props,
      'material',
      {
        set: this.setMaterial,
      },
    );
  }

  setSource = (value) => {
    const url = (value.uri) ? value.uri : value;

    if (this.instance) {
      if (this.instance.update(value)) {
        return;
      }

      if (this.instance) {
        this.instance.dispose();
      }
    }

    this.instance = createModelInstance(url, this.view);
  };

  setMaterial = (values) => {
    if (this.instance) {
      this.instance.setMaterial(values);
    }
  };

  dispose() {
    if (this.instance) {
      this.instance.dispose();
    }
    this.instance = null;
    super.dispose();
  }

  static describe() {
    return merge(super.describe(), {
      // declare the native props sent from react to runtime
      NativeProps: {
        source: 'string',
        material: 'object',
      },
    });
  }
}

export default RCTCustomModel;
