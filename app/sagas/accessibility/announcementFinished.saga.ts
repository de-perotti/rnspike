import { takeEvery } from 'redux-saga/effects';
import { AccessibilityAnnoucementFinishedEvent, Platform } from 'react-native';
import { createAccessibilityListener } from './accessibility.listener';

function* announcementFinishedWorker(
  event: AccessibilityAnnoucementFinishedEvent,
) {
  console.log('announcementFinished', event);
}

export function* accessibilityAnnouncementFinishedSaga() {
  if (Platform.OS === 'ios') {
    yield takeEvery(
      createAccessibilityListener('announcementFinished'),
      announcementFinishedWorker,
    );
  }
}
