import { all } from 'redux-saga/effects';
import { accessibilityAnnouncementFinishedSaga } from './announcementFinished';
import { accessibilityBoldTextChangedSaga } from './boldText';
import { accessibilityGrayscaleChangedSaga } from './grayscale';
import { accessibilityInvertColorsChangedSaga } from './invertColors';
import { accessibilityReduceMotionChangedSaga } from './reduceMotion';
import { accessibilityReduceTransparencyChangedSaga } from './reduceTransparency';
import { accessibilityScreenReaderChangedSaga } from './screenReader';

export function* accessibilitySagas() {
  yield all([
    accessibilityAnnouncementFinishedSaga(),
    accessibilityBoldTextChangedSaga(),
    accessibilityGrayscaleChangedSaga(),
    accessibilityInvertColorsChangedSaga(),
    accessibilityReduceMotionChangedSaga(),
    accessibilityReduceTransparencyChangedSaga(),
    accessibilityScreenReaderChangedSaga(),
  ]);
}
