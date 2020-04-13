import React, { FC } from 'react';
import {View, Button as RNButton} from 'react-native';
import { ButtonProps } from './Button.props';

export const Button: FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <View>
      <RNButton title={title} onPress={onPress} />
    </View>
  );
};
