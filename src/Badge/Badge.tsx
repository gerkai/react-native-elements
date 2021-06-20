import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { renderNode, RneFunctionComponent } from '../helpers';

export type BadgeProps = {
  containerStyle?: StyleProp<ViewStyle>;
  badgeStyle?: StyleProp<ViewStyle>;
  textProps?: TextProps;
  textStyle?: StyleProp<TextStyle>;
  value?: React.ReactNode;
  onPress?: (...args: any[]) => any;
  Component?: typeof React.Component;
  status?: 'primary' | 'success' | 'warning' | 'error';
};

export const Badge: RneFunctionComponent<BadgeProps> = ({
  containerStyle,
  textStyle,
  textProps,
  badgeStyle,
  onPress,
  Component = onPress ? TouchableOpacity : View,
  value,
  theme,
  status = 'primary',
  ...attributes
}) => {
  const element = renderNode(Text, value, {
    style: StyleSheet.flatten([styles.text, textStyle && textStyle]),
    ...textProps,
  });
  return (
    <View style={StyleSheet.flatten([containerStyle && containerStyle])}>
      <Component
        {...attributes}
        style={StyleSheet.flatten([
          {
            alignSelf: 'center',
            minWidth: size,
            height: size,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme?.colors?.[status],
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#fff',
          },
          !element && styles.miniBadge,
          badgeStyle && badgeStyle,
        ])}
        onPress={onPress}
      >
        {element}
      </Component>
    </View>
  );
};

const size = 18;
const miniSize = 8;

const styles = StyleSheet.create({
  miniBadge: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    minWidth: miniSize,
    height: miniSize,
    borderRadius: miniSize / 2,
  },
  text: {
    fontSize: 12,
    color: 'white',
    paddingHorizontal: 4,
  },
});

Badge.displayName = 'Badge';
