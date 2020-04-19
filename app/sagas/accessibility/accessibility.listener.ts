import { eventChannel } from 'redux-saga';
import { AccessibilityEventName, AccessibilityInfo } from 'react-native';

export function createAccessibilityListener(eventName: AccessibilityEventName) {
  return eventChannel((emit) => {
    AccessibilityInfo.addEventListener(eventName, emit);
    return () => AccessibilityInfo.removeEventListener(eventName, emit);
  });
}
