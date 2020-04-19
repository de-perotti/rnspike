import { call, take, race } from 'redux-saga/effects';
import { cancellableRequest } from '../lib/axios';

export function* watchCancellable() {
  while (true) {
    yield take('comecacusao');
    console.log('comecei');
    try {
      const { request, cancel } = yield race({
        request: call(cancellableRequest, { url: 'http://192.168.0.12:3000' }),
        cancel: take('cancelacusao'),
      });

      if (request) {
        console.log('request completou', request);
      } else if (cancel) {
        console.log('request cancelado', cancel, request);
      }
    } catch (e) {
      console.log('catch', e);
    }
  }
}
