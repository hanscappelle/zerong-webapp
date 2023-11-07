import {initialState} from './data.state';
import {createReducer, on} from '@ngrx/store';
import {
  listData,
  listDataFailed,
  listDataSuccess, login, loginFailed, loginSuccess,
} from './data.actions';
import {ViewState} from "../model/view-state.enum";

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
  on(listDataFailed, (state, {error}) => ({
    ...state,
    state: ViewState.ERROR,
    message: error,
  })),
);

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
  on(loginFailed, (state, {error}) => ({
    ...state,
    state: ViewState.ERROR,
    message: error,
  })),
);
