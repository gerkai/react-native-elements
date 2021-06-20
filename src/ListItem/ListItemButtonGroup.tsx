import React from 'react';
import { StyleSheet } from 'react-native';
import ButtonGroup, { ButtonGroupProps } from '../ButtonGroup';
import { RneFunctionComponent } from '../helpers';

export type ListItemButtonGroupProps = ButtonGroupProps;

export const ListItemButtonGroup: RneFunctionComponent<ListItemButtonGroupProps> = ({
  containerStyle,
  ...props
}) => {
  return (
    <ButtonGroup
      {...props}
      containerStyle={StyleSheet.flatten([styles.container, containerStyle])}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 0,
    marginVertical: 0,
  },
});

ListItemButtonGroup.displayName = 'ListItemButtonGroup';
