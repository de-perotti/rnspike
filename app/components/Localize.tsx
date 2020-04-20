import React, { useEffect, useState } from 'react';
import * as RNLocalize from 'react-native-localize';
import { Text } from 'react-native';
import { useIntl } from 'react-intl';
import { Button } from './button';
import { translationGetters } from '../translations';

const PRESSES_TO_SHOW = 5;

export const LocalizeList = () => {
  const [display, setDisplay] = useState(false);
  const [amountLeft, setAmoutLeft] = useState(PRESSES_TO_SHOW);
  const intl = useIntl();

  useEffect(() => {
    if (amountLeft === PRESSES_TO_SHOW) {
      return;
    }

    const timer = setTimeout(() => {
      setAmoutLeft(PRESSES_TO_SHOW);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [amountLeft]);

  if (!display) {
    return (
      <Text
        onPress={() => {
          setAmoutLeft((n) => n - 1);
          if (amountLeft === 1) {
            setDisplay(true);
          }
        }}
      >
        {intl.formatMessage({ id: 'intl.text.display.show' }, { amountLeft })}
      </Text>
    );
  }

  return (
    <>
      {[
        ['getCalendar', RNLocalize.getCalendar()],
        ['getCountry', RNLocalize.getCountry()],
        ['getCurrencies', RNLocalize.getCurrencies()],
        ['getLocales', RNLocalize.getLocales()],
        ['getNumberFormatSettings', RNLocalize.getNumberFormatSettings()],
        ['getTemperatureUnit', RNLocalize.getTemperatureUnit()],
        ['getTimeZone', RNLocalize.getTimeZone()],
        ['uses24HourClock', RNLocalize.uses24HourClock()],
        ['usesAutoDateAndTime', RNLocalize.usesAutoDateAndTime()],
        ['usesAutoTimeZone', RNLocalize.usesAutoTimeZone()],
        ['usesMetricSystem', RNLocalize.usesMetricSystem()],
        [
          'findBestAvailableLanguage',
          RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)),
        ],
      ].map(([fn, child], index) => (
        <Text key={index}>
          {fn}: {JSON.stringify(child, null, 2)}
        </Text>
      ))}
      <Button
        title={intl.formatMessage({ id: 'intl.text.display.hide' })}
        onPress={() => setDisplay(false)}
      />
    </>
  );
};
