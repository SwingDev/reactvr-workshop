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

export const ParticlePool = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformPropTypes),
    type: PropTypes.string,
    particlePosition: PropTypes.any,
    show: PropTypes.bool,
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
    const props = { ...this.props } || {};
    props.style = props.style || {};
    if (!props.style.position) {
      props.style.position = 'absolute';
    }

    return (
      <RKParticlePool {...props} />
    );
  },
});

export const RKParticlePool = requireNativeComponent(
  'ParticlePool',
  ParticlePool,
  {
    nativeOnly: {},
  },
);

/*
  eslint-enable
*/
