/*
  eslint-disable
  react/prefer-es6-class,
  react/sort-comp,
  react/require-default-props
*/

import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { View } from 'react-vr';

const NativeMethodsMixin = require('NativeMethodsMixin');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformPropTypes = require('LayoutAndTransformPropTypes');
const ReactNativeViewAttributes = require('ReactNativeViewAttributes');
const requireNativeComponent = require('requireNativeComponent');

const sourcePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object,
]);

export const CustomModel = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformPropTypes),
    source: sourcePropType.isRequired,
    material: PropTypes.shape({
      envMap: PropTypes.oneOfType([
        sourcePropType,
        PropTypes.arrayOf(sourcePropType),
      ]),
      map: sourcePropType,
      normalMap: sourcePropType,
      emissiveMap: sourcePropType,
      metalnessMap: sourcePropType,
      roughnessMap: sourcePropType,
      aoMap: sourcePropType,
      normalScale: PropTypes.number,
      emissive: PropTypes.string,
      color: PropTypes.string,
      metalness: PropTypes.number,
      roughness: PropTypes.number,
    }),
  },

  viewConfig: {
    uiViewClassName: 'Mesh',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
    },
  },

  getDefaultProps() {
    return {};
  },

  render() {
    return (
      <RKCustomModel {...this.props} />
    );
  },
});

export const RKCustomModel = requireNativeComponent(
  'CustomModel',
  CustomModel,
  {
    nativeOnly: {},
  },
);

/*
  eslint-enable
*/
