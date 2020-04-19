import { all, fork } from 'redux-saga/effects';
import { accessibilityAnnouncementFinishedSaga } from './announcementFinished.saga';
import { accessibilityBoldTextChangedSaga } from './boldText.saga';
import { accessibilityGrayscaleChangedSaga } from './grayscale.saga';
import { accessibilityInvertColorsChangedSaga } from './invertColors.saga';
import { accessibilityReduceMotionChangedSaga } from './reduceMotion.saga';
import { accessibilityReduceTransparencyChangedSaga } from './reduceTransparency.saga';
import { accessibilityScreenReaderChangedSaga } from './screenReader.saga';

export function* watchAccessibility() {
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
