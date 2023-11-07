import {Transmit} from "../model/transmit.model";
import {DataRequest} from "../model/data-request.model";
import {ViewState} from "../model/view-state.enum";
import {Unit} from "../model/unit.model";

export interface TransactionState extends BaseViewState {
  request: DataRequest;
  data: Transmit[];
  last: Transmit[];
  units: Unit[];
}

export interface BaseViewState {
  message: string | null;
  state: ViewState;
}

export const initialState: TransactionState = {
  request: {} as DataRequest,
  data: [],
  last: [],
  units: [],
  message: null,
  state: ViewState.LOADING,
};
