var _ = require('lodash');

import Expo from 'expo';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions,
  Image,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const STAR_IMAGE = require('./images/star.png');
const HEART_IMAGE = require('./images/heart.png');
const ROCKET_IMAGE = require('./images/rocket.png');
const BELL_IMAGE = require('./images/bell.png');

const STAR_WIDTH = 60;

const TYPES = {
  star: {
    source: STAR_IMAGE,
    color: '#f1c40f',
    backgroundColor: 'white',
  },
  heart: {
    source: HEART_IMAGE,
    color: '#e74c3c',
    backgroundColor: 'white',
  },
  rocket: {
    source: ROCKET_IMAGE,
    color: '#2ecc71',
    backgroundColor: 'white',
  },
  bell: {
    source: BELL_IMAGE,
    color: '#f39c12',
    backgroundColor: 'white',
  },
};

export default class Rating extends Component {
  static defaultProps = {
    type: 'star',
    ratingImage: require('./images/star.png'),
    ratingColor: '#f1c40f',
    ratingBackgroundColor: 'white',
    ratingCount: 5,
    imageSize: STAR_WIDTH,
    onFinishRating: () => console.log('Attach a function here.'),
  };

  constructor(props) {
    super(props);

    const { ratings, imageSize, ratingCount, onFinishRating } = this.props;

    const position = new Animated.ValueXY();
    const newValue = new Animated.ValueXY();
    newValue.setValue({ x: 0, y: 500 });
    const max_star_width = ratingCount * imageSize;

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
        this.setState({ value: gesture.dx });
      },
      onPanResponderRelease: (event, gesture) => {
        onFinishRating(this.getCurrentRating());
      },
    });

    this.state = { panResponder, position };
  }

  getBackgroundViewStyle() {
    const { position } = this.state;

    const color = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 4, 0, SCREEN_WIDTH / 4],
      outputRange: [
        'rgba(231, 76, 60, 1)',
        'rgba(46, 204, 113, 1)',
        'rgba(255, 0, 255, 1)',
      ],
    });

    const opacity = position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT, 0, SCREEN_HEIGHT],
      outputRange: [0, 1, 0],
    });

    return {
      backgroundColor: color,
      opacity,
    };
  }

  getPrimaryViewStyle() {
    const { position } = this.state;
    const { ratings, imageSize, ratingCount, type } = this.props;
    const max_star_width = ratingCount * imageSize;

    const color = TYPES[type].color;

    const width = position.x.interpolate({
      inputRange: [
        -ratingCount * (imageSize / 2),
        0,
        ratingCount * (imageSize / 2),
      ],
      outputRange: [0, ratingCount * imageSize / 2, ratingCount * imageSize],
      extrapolate: 'clamp',
    });

    return {
      backgroundColor: color,
      width,
      height: width ? imageSize : 0,
    };
  }

  getSecondaryViewStyle() {
    const { position } = this.state;
    const { ratings, imageSize, ratingCount, type } = this.props;
    const max_star_width = ratingCount * imageSize;

    const backgroundColor = TYPES[type].backgroundColor;

    const width = position.x.interpolate({
      inputRange: [
        -ratingCount * (imageSize / 2),
        0,
        ratingCount * (imageSize / 2),
      ],
      outputRange: [ratingCount * imageSize, ratingCount * imageSize / 2, 0],
      extrapolate: 'clamp',
    });

    return {
      backgroundColor,
      width,
      height: width ? imageSize : 0,
    };
  }

  renderRatings() {
    const { ratings, imageSize, ratingCount, type } = this.props;
    const source = TYPES[type].source;

    return _(ratingCount).times(index => (
      <View key={index} style={styles.starContainer}>
        <Image
          source={source}
          style={{ width: imageSize, height: imageSize }}
        />
      </View>
    ));
  }

  getCurrentRating() {
    const { value } = this.state;
    const { imageSize, ratingCount } = this.props;
    const startingValue = ratingCount / 2;
    let currentRating = 0;

    if (value > ratingCount * imageSize / 2) {
      currentRating = ratingCount;
    } else if (value > imageSize) {
      currentRating = Math.ceil(startingValue + value / imageSize);
    } else if (value < -ratingCount * imageSize / 2) {
      currentRating = 0;
    } else if (value < imageSize) {
      currentRating = Math.ceil(startingValue + value / imageSize);
    } else {
      currentRating = Math.ceil(startingValue);
    }

    return currentRating;
  }

  displayCurrentRating() {
    const { ratingCount, type } = this.props;

    const color = TYPES[type].color;

    return (
      <View style={styles.ratingView}>
        <Text style={styles.ratingText}>Rating: </Text>
        <Text style={[styles.currentRatingText, { color }]}>
          {this.getCurrentRating()}
        </Text>
        <Text style={styles.maxRatingText}>/{ratingCount}</Text>
      </View>
    );
  }

  render() {
    const {
      type,
      ratingImage,
      ratingColor,
      ratingBackgroundColor,
      style,
      showRating,
    } = this.props;

    if (type === 'custom') {
      custom = {
        source: ratingImage,
        color: ratingColor,
        backgroundColor: ratingBackgroundColor,
      };
      TYPES.custom = custom;
    }

    return (
      <View style={style}>
        {showRating && this.displayCurrentRating()}
        <View
          style={styles.starsWrapper}
          {...this.state.panResponder.panHandlers}
        >
          <View style={styles.starsInsideWrapper}>
            <Animated.View style={this.getPrimaryViewStyle()} />
            <Animated.View style={this.getSecondaryViewStyle()} />
          </View>
          {this.renderRatings()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  starsWrapper: {
    flexDirection: 'row',
  },
  starsInsideWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
  },
  ratingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  ratingText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Trebuchet MS',
    color: '#34495e',
  },
  currentRatingText: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Trebuchet MS',
  },
  maxRatingText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Trebuchet MS',
    color: '#34495e',
  },
});
