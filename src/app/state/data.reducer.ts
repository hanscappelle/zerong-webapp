import {initialState} from './data.state';
import {createReducer, on} from '@ngrx/store';
import {
  fetchFailed,
  lastTransmit, lastTransmitSuccess,
  listData,
  listDataSuccess, login, loginSuccess,
} from './data.actions';
import {ViewState} from "../model/view-state.enum";

export const unitsReducer = createReducer(
  initialState,
  on(login, (state, {request}) => ({
    ...state,
    request,
    state: ViewState.LOADING,
    message: null,
  })),
  on(loginSuccess, (state, {data}) => {
    return {
      ...state,
      units: data,
      state: ViewState.DONE,
      message: null,
    };
  }),
  on(fetchFailed, (state, {error}) => ({
    ...state,
    state: ViewState.ERROR,
    message: error,
  })),
);

export const lastReducer = createReducer(
  initialState,
  on(lastTransmit, (state, {request}) => ({
    ...state,
    request, // keeps track of request
    state: ViewState.LOADING,
    message: null,
  })),
  on(lastTransmitSuccess, (state, {last}) => {
    return {
      ...state,
      last,
      state: ViewState.DONE,
      message: null,
    };
  }),
  on(fetchFailed, (state, {error}) => ({
    ...state,
    state: ViewState.ERROR,
    message: error,
  })),
);

export const dataReducer = createReducer(
  initialState,
  on(listData, (state, {request}) => ({
    ...state,
    request, // keeps track of request
    state: ViewState.LOADING,
    message: null,
  })),
  on(listDataSuccess, (state, {data}) => {
    return {
      ...state,
      data,
      state: ViewState.DONE,
      message: null,
    };
  }),
  on(fetchFailed, (state, {error}) => ({
    ...state,
    state: ViewState.ERROR,
    message: error,
  })),
);
