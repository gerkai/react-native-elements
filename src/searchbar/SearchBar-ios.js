import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Dimensions,
  LayoutAnimation,
  UIManager,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Input from '../input/Input';

const SCREEN_WIDTH = Dimensions.get('window').width;
const IOS_GRAY = '#7d7d7d';

class SearchBar extends Component {
  focus = () => {
    this.input.focus();
  };

  blur = () => {
    this.input.blur();
  };

  clear = () => {
    this.input.clear();
    this.onChangeText('');
    this.props.onClearText && this.props.onClearText();
  };

  cancel = () => {
    this.blur();
    this.props.onCancel && this.props.onCancel();
  };

  onFocus = () => {
    this.props.onFocus && this.props.onFocus();
    UIManager.configureNextLayoutAnimation && LayoutAnimation.easeInEaseOut();
    this.setState({ hasFocus: true });
  };

  onBlur = () => {
    this.props.onBlur && this.props.onBlur();
    UIManager.configureNextLayoutAnimation && LayoutAnimation.easeInEaseOut();
    this.setState({ hasFocus: false });
  };

  onChangeText = text => {
    this.props.onChangeText && this.props.onChangeText(text);
    this.setState({ isEmpty: text === '' });
  };

  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false,
      isEmpty: true,
    };
  }

  render() {
    const {
      cancelButtonTitle,
      clearIcon,
      containerStyle,
      leftIcon,
      leftIconContainerStyle,
      rightIconContainerStyle,
      inputStyle,
      noIcon,
      placeholderTextColor,
      showLoading,
      loadingProps,
      ...attributes
    } = this.props;
    const { hasFocus, isEmpty } = this.state;
    const { style: loadingStyle, ...otherLoadingProps } = loadingProps;
    const searchIcon = (
      <Ionicon size={20} name={'ios-search'} color={IOS_GRAY} />
    );
    return (
      <View style={styles.container}>
        <Input
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          ref={input => (this.input = input)}
          inputStyle={[styles.input, inputStyle]}
          containerStyle={[
            styles.inputContainer,
            !hasFocus && { width: SCREEN_WIDTH - 32, marginRight: 15 },
            containerStyle,
          ]}
          leftIcon={noIcon ? undefined : leftIcon ? leftIcon : searchIcon}
          leftIconContainerStyle={[
            styles.leftIconContainerStyle,
            leftIconContainerStyle,
          ]}
          placeholderTextColor={placeholderTextColor || IOS_GRAY}
          rightIcon={
            <View style={{ flexDirection: 'row' }}>
              {showLoading && (
                <ActivityIndicator
                  style={[
                    clearIcon && !isEmpty && { marginRight: 10 },
                    loadingStyle,
                  ]}
                  {...otherLoadingProps}
                />
              )}
              {clearIcon &&
                !isEmpty && (
                  <Ionicon
                    name={'ios-close-circle'}
                    size={20}
                    color={IOS_GRAY}
                    onPress={() => this.clear()}
                  />
                )}
            </View>
          }
          rightIconContainerStyle={[
            styles.rightIconContainerStyle,
            rightIconContainerStyle,
          ]}
          {...attributes}
        />
        <Button title={cancelButtonTitle} onPress={this.cancel} />
      </View>
    );
  }
}

SearchBar.propTypes = {
  cancelButtonTitle: PropTypes.string,
  clearIcon: PropTypes.bool,
  loadingProps: PropTypes.object,
  noIcon: PropTypes.bool,
  showLoading: PropTypes.bool,
  onClearText: PropTypes.func,
  onCancel: PropTypes.func,
};

SearchBar.defaultProps = {
  cancelButtonTitle: 'Cancel',
  clearIcon: true,
  loadingProps: {},
  noIcon: false,
  showLoading: false,
  onClearText: null,
  onCancel: null,
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    backgroundColor: '#f5f5f5',
    paddingBottom: 13,
    paddingTop: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#c4c4c4',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginLeft: 6,
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: '#dcdce1',
    borderRadius: 9,
    height: 36,
    marginLeft: 15,
  },
  rightIconContainerStyle: {
    marginRight: 8,
  },
  leftIconContainerStyle: {
    marginLeft: 8,
  },
});

export default SearchBar;