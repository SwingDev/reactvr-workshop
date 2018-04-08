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
const LayoutAndTransformColorPropTypes = require('LayoutAndTransformColorPropTypes');
const ReactNativeViewAttributes = require('ReactNativeViewAttributes');
const requireNativeComponent = require('requireNativeComponent');

export const HemiLight = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformColorPropTypes),
    intensity: PropTypes.number,
    skyColor: PropTypes.number,
    groundColor: PropTypes.number,
  },

  viewConfig: {
    uiViewClassName: 'HemiLight',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
      intensity: true,
      skyColor: true,
      groundColor: true,
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
      <RKHemiLight
        {...props}
        testID={this.props.testID}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
      >
        {this.props.children}
      </RKHemiLight>
    );
  },
});

export const RKHemiLight = requireNativeComponent('HemiLight', HemiLight, {
  nativeOnly: {},
});

/*
  eslint-enable
*/
