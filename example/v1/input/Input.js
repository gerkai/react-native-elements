import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

import ViewPropTypes from '../config/ViewPropTypes';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Input extends Component {

  componentWillMount() {
    this.shake = this.shake.bind(this);
    this.shakeAnimationValue = new Animated.Value(0);
    this.props.shake && this.shake();
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  clear() {
    this.input.clear();
  }

  shake() {
    const { shakeAnimationValue } = this;
    shakeAnimationValue.setValue(0);
    Animated.timing(shakeAnimationValue, {
      duration: 375,
      toValue: 3,
      ease: Easing.bounce,
    }).start();
  }

  render() {
    const {
      containerStyle,
      icon,
      iconContainerStyle,
      inputStyle,
      displayError,
      errorStyle,
      errorMessage,
      ...attributes
    } = this.props;
    const translateX = this.shakeAnimationValue.interpolate({
      inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
      outputRange: [0, -15, 0, 15, 0, -15, 0],
    });

    return (
      <View>
        <Animated.View
          style={[
            styles.container,
            { width: SCREEN_WIDTH - 100, height: 40 },
            containerStyle,
            { transform: [{ translateX }] },
          ]}
        >
          {icon &&
            <View
              style={[styles.iconContainer, { height: 40 }, iconContainerStyle]}
            >
              {icon}
            </View>}
          <TextInput
            ref={input => (this.input = input)}
            underlineColorAndroid="transparent"
            style={[
              styles.input,
              { width: SCREEN_WIDTH - 100, height: 40 },
              inputStyle,
            ]}
            {...attributes}
          />
        </Animated.View>
        {displayError &&
          <Text style={[styles.error, errorStyle && errorStyle]}>
            {errorMessage || 'Error!'}
          </Text>}
      </View>
    );
  }
}

Input.propTypes = {
  containerStyle: ViewPropTypes.style,

  icon: PropTypes.object,
  iconContainerStyle: ViewPropTypes.style,

  inputStyle: PropTypes.object,

  shake: PropTypes.any,
  displayError: PropTypes.bool,
  errorStyle: PropTypes.object,
  errorMessage: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(171, 189, 219, 1)',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  input: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    marginLeft: 10,
  },
  error: {
    color: '#FF2D00',
    margin: 5,
    fontSize: 12,
  },
});

export default Input;
