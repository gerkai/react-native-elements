import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { create } from 'react-test-renderer';

import theme from '../../config/theme';
import { ThemeProvider } from '../../config';

import ThemedButtonGroup, { ButtonGroup } from '../ButtonGroup';

const buttons = ['Button 1', 'Button 2', 'Button 3'];

describe('ButtonGroup Component', () => {
  it('should render without issues', () => {
    const component = shallow(<ButtonGroup theme={theme} buttons={buttons} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should have onPress event', () => {
    const onPress = jest.fn();
    const component = shallow(
      <ButtonGroup
        theme={theme}
        buttons={buttons}
        onPress={onPress}
        containerStyle={{ backgroundColor: 'yellow' }}
        buttonStyle={{ backgroundColor: 'blue' }}
      />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render selectedIndex', () => {
    const component = shallow(
      <ButtonGroup
        theme={theme}
        buttons={buttons}
        selectedIndex={1}
        selectedButtonStyle={{ backgroundColor: 'red' }}
        selectedTextStyle={{ fontSize: 12 }}
      />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with button.element', () => {
    const component = shallow(
      <ButtonGroup
        theme={theme}
        buttons={[{ element: 'Text' }, { element: 'View' }]}
        innerBorderStyle={{ width: 300, color: 'red' }}
      />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render lastButtonStyle', () => {
    const component = shallow(
      <ButtonGroup
        theme={theme}
        buttons={buttons}
        lastBorderStyle={{ backgroundColor: 'red' }}
      />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render without inner borders', () => {
    const component = shallow(
      <ButtonGroup
        theme={theme}
        buttons={buttons}
        innerBorderStyle={{ width: 0 }}
      />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should select an item', () => {
    const onPress = jest.fn();

    const wrapper = shallow(
      <ButtonGroup
        theme={theme}
        buttons={buttons}
        innerBorderStyle={{ width: 0 }}
        onPress={onPress}
      />
    );

    wrapper
      .find({ testID: 'buttonGroupItem' })
      .at(2)
      .simulate('press');
    expect(onPress).toBeCalledWith(2);
  });

  describe('Select Multiple', () => {
    it('should select an additional item', () => {
      const onPress = jest.fn();

      const wrapper = shallow(
        <ButtonGroup
          theme={theme}
          buttons={buttons}
          innerBorderStyle={{ width: 0 }}
          selectMultiple
          selectedIndexes={[0]}
          onPress={onPress}
        />
      );

      wrapper
        .find({ testID: 'buttonGroupItem' })
        .at(2)
        .simulate('press');
      expect(onPress).toBeCalledWith([0, 2]);
    });

    it('should deselect a selected item', () => {
      const onPress = jest.fn();

      const wrapper = shallow(
        <ButtonGroup
          theme={theme}
          buttons={buttons}
          innerBorderStyle={{ width: 0 }}
          selectMultiple
          selectedIndexes={[0, 2]}
          onPress={onPress}
        />
      );

      wrapper
        .find({ testID: 'buttonGroupItem' })
        .at(2)
        .simulate('press');
      expect(onPress).toBeCalledWith([0]);
    });
  });

  it('should apply values from theme', () => {
    const theme = {
      ButtonGroup: {
        selectedTextStyle: {
          color: 'red',
        },
      },
    };

    const component = create(
      <ThemeProvider theme={theme}>
        <ThemedButtonGroup buttons={buttons} selectedIndex={0} />
      </ThemeProvider>
    );

    expect(
      component.root.findAllByProps({ testID: 'buttonGroupItemText' })[0].props
        .style
    ).toMatchObject({
      color: 'red',
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
