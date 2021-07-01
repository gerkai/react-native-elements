import React from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  Animated,
  Platform,
  ViewProps,
} from 'react-native';
import Color from 'color';
import { RneFunctionComponent } from '../helpers';

export type LinearProgressProps = ViewProps & {
  /** The value of the progress indicator for the determinate variant. Value between 0 and 1. */
  value?: number;

  /** Type of button. */
  variant?: 'determinate' | 'indeterminate';

  /** Color for linear progress. */
  color?: 'primary' | 'secondary' | string;

  /** Track color for linear progress. */
  trackColor?: string;

  /** Add additional styling for linear progress component. */
  style?: StyleProp<ViewStyle>;
};

/** Progress indicators inform users about the status of ongoing processes, such as loading an app, submitting a form, or saving updates.
 * They communicate an app’s state and indicate available actions, such as whether users can navigate away from the current screen.
 * Also receives all [View](https://reactnative.dev/docs/view#props) props */
export const LinearProgress: RneFunctionComponent<LinearProgressProps> = ({
  value = 0,
  variant = 'indeterminate',
  color = 'secondary',
  style,
  theme,
  trackColor,
  ...props
}) => {
  const [width, setWidth] = React.useState<number>(0);

  const { current: animation } = React.useRef<Animated.Value>(
    new Animated.Value(0)
  );

  const intermediate = React.useRef<Animated.CompositeAnimation>();

  const startAnimation = React.useCallback(() => {
    if (variant === 'indeterminate') {
      intermediate.current = Animated.timing(animation, {
        duration: 2000,
        toValue: 1,
        useNativeDriver: true,
        isInteraction: false,
      });
      animation.setValue(0);

      Animated.loop(intermediate.current).start();
    } else {
      Animated.timing(animation, {
        duration: 1000,
        toValue: value || 0,
        useNativeDriver: Platform.OS !== 'web',
        isInteraction: false,
      }).start();
    }
  }, [animation, variant, value]);

  const tintColor =
    color === 'secondary' || color === 'primary'
      ? theme?.colors?.[color]
      : Color(color).rgb().string() || theme?.colors?.secondary;

  const trackTintColor =
    trackColor || Color(tintColor).alpha(0.4).rgb().string();

  React.useEffect(() => {
    startAnimation();
  }, [startAnimation, value]);

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{
        now: value,
        min: 0,
        max: 1,
      }}
      {...props}
      onLayout={(e) => {
        setWidth(e.nativeEvent.layout.width);
      }}
      style={[
        {
          height: 4,
          overflow: 'hidden',
          width: '100%',
          backgroundColor: trackTintColor,
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          transform: [
            {
              translateX: animation.interpolate(
                variant === 'indeterminate'
                  ? {
                      inputRange: [0, 1],
                      outputRange: [-width, 0.5 * width],
                    }
                  : {
                      inputRange: [0, 1],
                      outputRange: [-0.5 * width, 0],
                    }
              ),
            },
            {
              scaleX: animation.interpolate(
                variant === 'indeterminate'
                  ? {
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.0001, 1, 0.001],
                    }
                  : {
                      inputRange: [0, 1],
                      outputRange: [0.0001, 1],
                    }
              ),
            },
          ],
          backgroundColor: tintColor as string,
          flex: 1,
        }}
      />
    </View>
  );
};

LinearProgress.displayName = 'LinearProgress';
