import {createAction, props} from '@ngrx/store';
import {Transmit} from "../model/transmit.model";
import {DataRequest} from "../model/data-request.model";
import {Unit} from "../model/unit.model";

export const login = createAction(
  'login to retrieve unit number',
  props<{ request: DataRequest }>(),
);

export const loginSuccess = createAction(
  'login OK',
  props<{ data: Unit[] }>(),
);

export const loginFailed = createAction(
  'login Failed',
  props<{ error: string }>(),
);


export const listData = createAction(
  'list all data for given request',
  props<{ request: DataRequest }>(),
);

export const listDataSuccess = createAction(
  'success loading data',
  props<{ data: Transmit[] }>(),
);

export const listDataFailed = createAction(
  'failed loading data',
  props<{ error: string }>(),
);
