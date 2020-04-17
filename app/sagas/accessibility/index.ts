import { all, fork } from 'redux-saga/effects';
import { accessibilityAnnouncementFinishedSaga } from './announcementFinished';
import { accessibilityBoldTextChangedSaga } from './boldText';
import { accessibilityGrayscaleChangedSaga } from './grayscale';
import { accessibilityInvertColorsChangedSaga } from './invertColors';
import { accessibilityReduceMotionChangedSaga } from './reduceMotion';
import { accessibilityReduceTransparencyChangedSaga } from './reduceTransparency';
import { accessibilityScreenReaderChangedSaga } from './screenReader';

export function* accessibilitySagas() {
  yield all([
    fork(accessibilityAnnouncementFinishedSaga),
    fork(accessibilityBoldTextChangedSaga),
    fork(accessibilityGrayscaleChangedSaga),
    fork(accessibilityInvertColorsChangedSaga),
    fork(accessibilityReduceMotionChangedSaga),
    fork(accessibilityReduceTransparencyChangedSaga),
    fork(accessibilityScreenReaderChangedSaga),
  ]);
}
