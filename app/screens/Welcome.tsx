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
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store/store';
import { useOrientation } from '../hooks/useOrientation';
import { useIntl } from 'react-intl';
import { LocalizeList } from '../components/Localize';
import { setLocale } from '../store/localization.slice';
import { Languages } from '../translations';
import { Cancel } from '../components/Cancel';

export const Welcome = (props: any) => {
  const { isForeground, isInitialized } = useSelector(
    (state: AppState) => state.app,
  );
  const [pressed, setPressed] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);
  const listeners: EventListeners = useMemo(
    () => ({
      navigationButtonPressed(e: NavigationButtonPressedEvent) {
        console.log('Navigation Button pressed', e);
        setPressed((p) => p + 1);
      },
      componentDidDisappear(e: ComponentDidDisappearEvent) {
        console.log('Welcome screen disappeared', e);
      },
      componentDidAppear(e: ComponentDidAppearEvent) {
        console.log('Welcome scren appeared', e);
      },
    }),
    [],
  );

  useScreenEvents(listeners, props.componentId);

  const orientation = useOrientation();
  const intl = useIntl();
  const dispatch = useDispatch();

  if (!isInitialized) {
    return <Text>Still loading my dude. Check rootSaga for the delay.</Text>;
  }

  return (
    <ScrollView
      testID="rolezao"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingTop: Platform.OS === 'android' ? paddingTop : 0,
        paddingHorizontal: orientation === 'landscape' ? paddingTop : 0,
      }}
    >
      <Cancel />
      <View>
        <Button
          title={intl.formatMessage({ id: 'i18n.lang.portuguese' })}
          onPress={() =>
            dispatch(
              setLocale({ locale: Languages.PORTUGUESE, userDefined: true }),
            )
          }
        />
        <Button
          title={intl.formatMessage({ id: 'i18n.lang.english' })}
          onPress={() =>
            dispatch(
              setLocale({ locale: Languages.ENGLISH, userDefined: true }),
            )
          }
        />
        <Text>paddingTop: {paddingTop}</Text>
        <Text>orientation: {orientation}</Text>
        <Text>pressed: {pressed}</Text>
        <Text>isForeground: {String(isForeground)}</Text>
        <Text>isInitialized: {String(isInitialized)}</Text>
        {__DEV__ && <LocalizeList />}
        <Button
          title={intl.formatMessage({
            id: 'screen.welcome.button.modify.topbar',
          })}
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
