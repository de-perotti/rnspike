import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text, Platform } from 'react-native';
import {
  ComponentDidAppearEvent,
  ComponentDidDisappearEvent,
  Navigation,
  NavigationButtonPressedEvent,
} from 'react-native-navigation';
import { EventListeners, useScreenEvents } from '../navigation/hooks';
import { Button } from '../components/button';
import { useSelector } from 'react-redux';
import { AppState } from '../store/store';

export const Welcome = (props: any) => {
  const { isForeground, isInitialized } = useSelector(
    (state: AppState) => state.app,
  );
  const [pressed, setPressed] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);
  const listeners: EventListeners = useMemo(
    () => ({
      navigationButtonPressed(e: NavigationButtonPressedEvent) {
        console.log('buttotn pressed', e);
        setPressed(p => p + 1);
      },
      componentDidDisappear(e: ComponentDidDisappearEvent) {
        console.log('aaaai lmaoo disappear', e);
      },
      componentDidAppear(e: ComponentDidAppearEvent) {
        console.log('lmao appear', e);
      },
    }),
    [],
  );

  useScreenEvents(listeners, props.componentId);

  return (
    <ScrollView
      testID="rolezao"
      contentInsetAdjustmentBehavior="automatic"
      style={{ paddingTop: Platform.OS === 'android' ? paddingTop : 0 }}
    >
      <View>
        <Text>pressed: {pressed}</Text>
        <Text>isForeground: {String(isForeground)}</Text>
        <Text>isInitialized: {String(isInitialized)}</Text>
        <Button
          title="Modify topbar"
          onPress={() => {
            Navigation.constants().then(({ topBarHeight }) => {
              setPaddingTop(topBarHeight);
              Navigation.mergeOptions(props.componentId, {
                topBar: {
                  drawBehind: true,
                  hideOnScroll: true,
                  rightButtons: [
                    {
                      text: 'Clickme',
                      id: 'buttonid',
                    },
                  ],
                },
              });
            });
          }}
        />
      </View>
    </ScrollView>
  );
};
