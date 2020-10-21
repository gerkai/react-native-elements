import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image as RNImage,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import isEqual from 'lodash.isequal';

import { withTheme } from '../config';
import { renderNode, nodeType, ImageSourceType } from '../helpers';

import Icon from '../icons/Icon';
import Image from '../image/Image';
import Accessory from './Accessory';

const avatarSizes = {
  small: 34,
  medium: 50,
  large: 75,
  xlarge: 150,
};

const AvatarComponent = ({
  onPress,
  onLongPress,
  Component = onPress || onLongPress ? TouchableOpacity : View,
  containerStyle,
  icon,
  iconStyle,
  source,
  size,
  avatarStyle,
  rounded,
  title,
  titleStyle,
  overlayContainerStyle,
  imageProps,
  placeholderStyle,
  renderPlaceholderContent,
  ImageComponent,
  children,
  ...attributes
}) => {
  const width =
    typeof size === 'number' ? size : avatarSizes[size] || avatarSizes.small;
  const height = width;
  const titleSize = width / 2;
  const iconSize = width / 2;

  const PlaceholderContent =
    (renderPlaceholderContent &&
      renderNode(undefined, renderPlaceholderContent)) ||
    (title && (
      <Text
        style={StyleSheet.flatten([
          styles.title,
          { fontSize: titleSize },
          titleStyle,
        ])}
      >
        {title}
      </Text>
    )) ||
    (icon && (
      <Icon
        style={iconStyle && iconStyle}
        color={icon.color || 'white'}
        name={icon.name || 'user'}
        size={icon.size || iconSize}
        type={icon.type && icon.type}
      />
    ));

  // Remove placeholder styling if we're not using image
  const hidePlaceholder = source && source.uri;

  // Merge image container style
  const imageContainerStyle = StyleSheet.flatten([
    styles.overlayContainer,
    rounded && { borderRadius: width / 2, overflow: 'hidden' },
    overlayContainerStyle,
    imageProps && imageProps.containerStyle,
  ]);

  if (imageProps && imageProps.containerStyle) {
    delete imageProps.containerStyle;
  }

  return (
    <Component
      onPress={onPress}
      onLongPress={onLongPress}
      style={StyleSheet.flatten([
        styles.container,
        { height, width },
        rounded && { borderRadius: width / 2 },
        containerStyle,
      ])}
      {...attributes}
    >
      <Image
        placeholderStyle={StyleSheet.flatten([
          placeholderStyle,
          !hidePlaceholder && styles.hiddenPlaceholderStyle,
        ])}
        PlaceholderContent={PlaceholderContent}
        containerStyle={imageContainerStyle}
        source={source}
        borderRadius={rounded ? width / 2 : undefined}
        {...imageProps}
        style={StyleSheet.flatten([
          styles.avatar,
          imageProps && imageProps.style,
          avatarStyle,
        ])}
        ImageComponent={ImageComponent}
      />
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  avatar: {
    flex: 1,
    width: null,
    height: null,
  },
  overlayContainer: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  hiddenPlaceholderStyle: {
    backgroundColor: 'transparent',
  },
});

AvatarComponent.propTypes = {
  Component: PropTypes.oneOf([
    View,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
  ]),
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  source: ImageSourceType,
  avatarStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  rounded: PropTypes.bool,
  title: PropTypes.string,
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  overlayContainerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  activeOpacity: PropTypes.number,
  icon: PropTypes.object,
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    PropTypes.number,
  ]),
  placeholderStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderPlaceholderContent: nodeType,
  imageProps: PropTypes.object,
  ImageComponent: PropTypes.elementType,
};

AvatarComponent.defaultProps = {
  size: 'small',
  ImageComponent: RNImage,
};

const Avatar = React.memo(AvatarComponent, isEqual);
export { Avatar };
const ThemedAvatar = withTheme(Avatar, 'Avatar');

ThemedAvatar.Accessory = Accessory;

export default ThemedAvatar;
