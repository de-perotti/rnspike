import React from 'react';
import { Button } from './Button';
import { render, fireEvent } from '@testing-library/react-native';

describe('Button', () => {
  it('has android text', () => {
    const spy = jest.spyOn(console, 'log');
    const { getByText } = render(<Button onPress={() => { console.log('yay'); }} title="android" />);
    fireEvent.press(getByText(/android/));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
