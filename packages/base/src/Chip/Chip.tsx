import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { RneFunctionComponent } from '../helpers';
import { ButtonProps, Button } from '../Button';

export interface ChipProps
  extends Omit<ButtonProps, 'loading' | 'loadingStyle' | 'loadingProps'> {
  /** Type of button. */
  type?: 'solid' | 'outline';
}

/** Chips are compact elements that represent an input, attribute, or action.
 * They may display text, icons, or both. */
export const Chip: RneFunctionComponent<ChipProps> = ({
  titleStyle,
  buttonStyle,
  onPress,
  ...rest
}) => {
  return (
    <Button
      titleStyle={StyleSheet.flatten([
        { fontSize: 14, paddingHorizontal: 2 },
        titleStyle,
      ])}
      containerStyle={{ borderRadius: 30 }}
      buttonStyle={StyleSheet.flatten([{ borderRadius: 30 }, buttonStyle])}
      {...(onPress === undefined
        ? {
            TouchableComponent: TouchableWithoutFeedback,
          }
        : { onPress })}
      {...rest}
    />
  );
};

Chip.displayName = 'Chip';
