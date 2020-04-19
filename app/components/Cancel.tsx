import React, { useRef, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatchRequest } from '../hooks/useDispatchRequest';
import * as mockApi from '../api/mockapi';
import {
  addRequest,
  removeRequestsByName,
  removeRequestById,
  RequestLimitation,
} from '../store/request.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { cancellableThunkRequest, axios } from '../lib/axios';
import { AxiosError } from 'axios';

function isAxiosError(e: any): e is AxiosError {
  return e.isAxiosError;
}

const anotherThunk = createAsyncThunk(
  'rolezao',
  async (
    args: Omit<ReturnType<typeof addRequest>['payload'], 'id'>,
    thunkAPI,
  ) => {
    try {
      thunkAPI.dispatch(addRequest({ ...args, id: thunkAPI.requestId }));
      const { title } = await cancellableThunkRequest(
        { ...args.config, timeout: args.timeout },
        thunkAPI,
      );
      thunkAPI.dispatch(
        removeRequestById({ name: args.name, id: thunkAPI.requestId }),
      );
      return title;
    } catch (e) {
      console.log('anotherThunk rolezao', e);
      if (
        !(
          isAxiosError(e) &&
          /5\d\d/.test(e.response?.status.toString() || '400')
        )
      ) {
        thunkAPI.dispatch(
          removeRequestById({ name: args.name, id: thunkAPI.requestId }),
        );
      }

      if (axios.isCancel(e)) {
        console.log('i know we cancelled');
      }

      return null;
    }
  },
);

export const Cancel = () => {
  const request = useDispatchRequest();
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: AppState) => !!state.request.queue.idsByName.Cancel?.length,
  );
  const promise = useRef<any>(null);
  const [loadingThunk, setLoadingThunk] = useState(false);

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <Button
          title="start saga"
          onPress={() =>
            request({
              config: mockApi.index,
              timeout: 20000,
              name: 'Cancel',
            })
          }
        />
        <Button
          title="cancel saga"
          onPress={() => dispatch(removeRequestsByName({ name: 'Cancel' }))}
        />
        <View>
          <Text>{loading ? 'loading' : 'not loading'}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Button
          title="start thunk"
          onPress={() => {
            setLoadingThunk(true);
            promise.current = dispatch(
              anotherThunk({
                timeout: 20000,
                name: 'ROLE',
                limitation: RequestLimitation.NONE,
                config: mockApi.index,
              }),
            );

            promise.current.then(() => {
              setLoadingThunk(false);
            });
          }}
        />
        <Button
          title="cancel thunk"
          onPress={() => promise.current?.abort?.()}
        />
        <View>
          <Text>{loadingThunk ? 'loading' : 'not loading'}</Text>
        </View>
      </View>
    </View>
  );
};
